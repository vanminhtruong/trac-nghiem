# PowerShell script để deploy lên GitHub Pages
# Chạy script: .\deploy.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Deploy to GitHub Pages" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Build project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Navigate to dist
Set-Location dist

# Initialize git
Write-Host "🔧 Initializing git in dist folder..." -ForegroundColor Yellow
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

Write-Host "✅ Git initialized and committed!" -ForegroundColor Green
Write-Host ""

# Prompt for repository URL
Write-Host "📝 Enter your GitHub repository URL:" -ForegroundColor Yellow
Write-Host "   Example: https://github.com/username/repo.git" -ForegroundColor Gray
$repoUrl = Read-Host "Repository URL"

if ($repoUrl) {
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    git push -f $repoUrl gh-pages
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================" -ForegroundColor Green
        Write-Host "  ✅ Deploy successful!" -ForegroundColor Green
        Write-Host "================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your site will be available at:" -ForegroundColor Cyan
        $repoName = ($repoUrl -split '/')[-1] -replace '\.git$', ''
        $username = ($repoUrl -split '/')[-2]
        Write-Host "https://$username.github.io/$repoName/" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Push failed!" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "ℹ️  No repository URL provided." -ForegroundColor Yellow
    Write-Host "To push manually, run:" -ForegroundColor Cyan
    Write-Host "git push -f YOUR_REPO_URL gh-pages" -ForegroundColor White
}

# Go back
Set-Location ..

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
