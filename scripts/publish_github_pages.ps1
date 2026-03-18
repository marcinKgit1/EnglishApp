param(
  [Parameter(Mandatory = $false)]
  [string]$RemoteUrl,

  [Parameter(Mandatory = $false)]
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

function Step([string]$message) {
  Write-Host "==> $message" -ForegroundColor Cyan
}

Step "Checking required tools"
git --version | Out-Null
npm --version | Out-Null

Step "Installing dependencies"
npm ci

Step "Running type check"
npm run lint

Step "Building production bundle"
npm run build

Step "Checking Supabase read connectivity"
npx tsx scripts/check.ts

if (-not (Test-Path .git)) {
  Step "Initializing git repository"
  git init
}

Step "Configuring branch"
git branch -M $Branch

Step "Staging files"
git add .

$hasStaged = git diff --cached --name-only
if ([string]::IsNullOrWhiteSpace($hasStaged)) {
  Step "No staged changes to commit"
} else {
  Step "Creating commit"
  git commit -m "Prepare GitHub Pages deployment"
}

if (-not [string]::IsNullOrWhiteSpace($RemoteUrl)) {
  Step "Configuring remote origin"
  $hasOrigin = $false
  try {
    git remote get-url origin | Out-Null
    $hasOrigin = $true
  } catch {
    $hasOrigin = $false
  }

  if ($hasOrigin) {
    git remote set-url origin $RemoteUrl
  } else {
    git remote add origin $RemoteUrl
  }

  Step "Pushing branch to origin"
  git push -u origin $Branch
} else {
  Write-Host "Remote URL not provided. Skipping push step." -ForegroundColor Yellow
  Write-Host "Use: git remote add origin https://github.com/OWNER/REPO.git" -ForegroundColor Yellow
  Write-Host "Then: git push -u origin $Branch" -ForegroundColor Yellow
}

Write-Host "" 
Write-Host "Next required GitHub settings:" -ForegroundColor Green
Write-Host "1) Add repository secrets: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY"
Write-Host "2) Settings -> Pages -> Source: GitHub Actions"
Write-Host "3) Verify workflow run: .github/workflows/deploy-pages.yml"