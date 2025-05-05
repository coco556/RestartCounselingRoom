// モバイルメニューの切り替え
document.addEventListener("DOMContentLoaded", () => {
  // 現在の年を設定
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // モバイルメニューの切り替え
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // LINE QRコードモーダル
  const lineQrModal = document.getElementById("lineQrModal")
  const closeModal = document.getElementById("closeModal")

  // LINEリンクがクリックされたときにモーダルを表示（オプション）
  const lineLinks = document.querySelectorAll('a[href*="lin.ee"]')
  lineLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // モバイルデバイスでは直接LINEに飛ばす
      if (window.innerWidth < 768) {
        return true
      }

      // PCではモーダルを表示
      e.preventDefault()
      lineQrModal.classList.remove("hidden")
      lineQrModal.classList.add("active")
    })
  })

  // モーダルを閉じる
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      lineQrModal.classList.remove("active")
      setTimeout(() => {
        lineQrModal.classList.add("hidden")
      }, 300)
    })
  }

  // モーダルの外側をクリックしても閉じる
  if (lineQrModal) {
    lineQrModal.addEventListener("click", (e) => {
      if (e.target === lineQrModal) {
        lineQrModal.classList.remove("active")
        setTimeout(() => {
          lineQrModal.classList.add("hidden")
        }, 300)
      }
    })
  }

  // スクロールアニメーション
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in")
      }
    })
  }

  // 初期アニメーション
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("animate-on-scroll")
  })

  // スクロール時のアニメーション
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // 初期表示時にも実行

  // ページ読み込み完了時のパフォーマンス最適化
  window.addEventListener("load", () => {
    // 遅延読み込み画像の処理
    const lazyImages = document.querySelectorAll('img[loading="lazy"]')
    if ("loading" in HTMLImageElement.prototype) {
      // ブラウザがネイティブの遅延読み込みをサポートしている場合
      lazyImages.forEach((img) => {
        img.src = img.dataset.src
      })
    } else {
      // ブラウザがネイティブの遅延読み込みをサポートしていない場合
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
            lazyImageObserver.unobserve(lazyImage)
          }
        })
      })

      lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage)
      })
    }
  })
})
