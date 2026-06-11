document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.querySelector("#year").innerHTML = new Date().getFullYear() + " ";

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector(".lazy-spotify");
  const skeleton = document.querySelector(".spotify-skeleton");

  if (!iframe) return;

  let hasScrolled = false;

  const loadIframe = () => {
    if (hasScrolled) return;
    hasScrolled = true;

    const iframeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.src = target.dataset.src;

            target.addEventListener(
              "load",
              () => {
                target.classList.remove("opacity-0");
                skeleton.classList.add("hidden");
              },
              { once: true },
            );

            observer.unobserve(target);
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" },
    );

    iframeObserver.observe(iframe);
    window.removeEventListener("scroll", loadIframe);
  };

  window.addEventListener("scroll", loadIframe, { passive: true });
});
