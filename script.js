// ページが読み込まれたときに実行
document.addEventListener("DOMContentLoaded", () => {
  // 現在の年を設定
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // モバイルメニューの切り替え
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      if (mobileMenu.style.display === "block") {
        mobileMenu.style.maxHeight = "0"
        mobileMenu.style.opacity = "0"
        setTimeout(() => {
          mobileMenu.style.display = "none"
        }, 300)
      } else {
        mobileMenu.style.display = "block"
        setTimeout(() => {
          mobileMenu.style.maxHeight = "200px"
          mobileMenu.style.opacity = "1"
        }, 10)
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
      lineQrModal.style.display = "flex"
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
        lineQrModal.style.display = "none"
      }, 300)
    })

    // モーダルの外側をクリックしても閉じる
    lineQrModal.addEventListener("click", (e) => {
      if (e.target === lineQrModal) {
        lineQrModal.classList.remove("active")
        setTimeout(() => {
          lineQrModal.style.display = "none"
        }, 300)
      }
    })
  }

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
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        e.preventDefault()
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })

        // モバイルメニューが開いていれば閉じる
        if (mobileMenu && mobileMenu.style.display === "block") {
          menuToggle.click()
        }
      }
    })
  })
})
