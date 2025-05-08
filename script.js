// モバイルメニューの切り替え
document.addEventListener("DOMContentLoaded", () => {
  // 現在の年を設定
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // モバイルメニューの切り替え
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden")
        setTimeout(() => {
          mobileMenu.style.maxHeight = "200px"
          mobileMenu.style.opacity = "1"
        }, 10)
      } else {
        mobileMenu.style.maxHeight = "0"
        mobileMenu.style.opacity = "0"
        setTimeout(() => {
          mobileMenu.classList.add("hidden")
        }, 300)
      }
    })
  }

  // LINE QRコードモーダル
  const lineQrModal = document.getElementById("lineQrModal")
  const closeModal = document.getElementById("closeModal")

  // PCでLINEリンクがクリックされたときにモーダルを表示
  const lineLinks = document.querySelectorAll('a[href*="lin.ee"]')
  lineLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // モバイルデバイスでは直接LINEに飛ばす
      if (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return true
      }

      // PCではモーダルを表示
      e.preventDefault()
      lineQrModal.classList.remove("hidden")
      setTimeout(() => {
        lineQrModal.classList.add("active")
      }, 10)
    })
  })

  // モーダルを閉じる
  if (closeModal && lineQrModal) {
    closeModal.addEventListener("click", () => {
      lineQrModal.classList.remove("active")
      setTimeout(() => {
        lineQrModal.classList.add("hidden")
      }, 300)
    })

    // モーダルの外側をクリックしても閉じる
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
    const windowHeight = window.innerHeight

    elements.forEach((element) => {
      // 初期表示時はすべて表示する
      element.classList.add("fade-in")

      // スクロール時のアニメーションは軽くする
      const elementPosition = element.getBoundingClientRect().top
      if (elementPosition < windowHeight - 50) {
        element.classList.add("scrolled")
      }
    })
  }

  // セクションにはアニメーションクラスを付けるが、初期状態では表示する
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("animate-on-scroll")
    section.classList.add("fade-in") // 初期状態で表示
  })

  // スクロール時の軽いアニメーションのみ適用
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll()

  // 画像の遅延読み込みを修正
  // すべての画像を即時読み込み
  const allImages = document.querySelectorAll("img")
  allImages.forEach((img) => {
    // data-src属性があれば適用、なければ現在のsrcを維持
    if (img.dataset.src) {
      img.src = img.dataset.src
    }
    // loading="lazy"属性を削除して即時読み込みを強制
    img.removeAttribute("loading")
    img.classList.add("fade-in")
  })

  // レスポンシブ対応の強化
  function checkResponsive() {
    const viewportWidth = window.innerWidth
    const elements = document.querySelectorAll(".responsive-check")

    elements.forEach((element) => {
      if (viewportWidth < 640) {
        element.classList.add("mobile")
        element.classList.remove("tablet", "desktop")
      } else if (viewportWidth >= 640 && viewportWidth < 1024) {
        element.classList.add("tablet")
        element.classList.remove("mobile", "desktop")
      } else {
        element.classList.add("desktop")
        element.classList.remove("mobile", "tablet")
      }
    })
  }

  // 初期チェックとリサイズ時のチェック
  checkResponsive()
  window.addEventListener("resize", checkResponsive)

  // タッチデバイスの検出
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

  if (isTouchDevice) {
    document.body.classList.add("touch-device")
  }

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // モバイルメニューが開いていれば閉じる
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          menuToggle.click()
        }
      }
    })
  })
})
