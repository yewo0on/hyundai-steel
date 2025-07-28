/* fnb accodian */
$(document).ready(function () {
  $(".main-menu").click(function () {
    $(this).children(".sub").slideToggle();
  });
});

/* header menu button */
const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
});

/* ScrollTrigger, ScrollSmoother 등록 */
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
});

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2, // 기본 스크롤 부드러움 정도
  effects: true, // data-speed나 data-lag 사용 가능하게
  smoothTouch: 0.1, // 터치 디바이스에서 부드러움 정도
});

/* 공통 updown 애니메이션 */
const updownAnimate = (obj) => {
  let y = 0;
  let duration = 0;

  if (obj.classList.contains("img-obj4")) {
    y = -30;
    duration = 1;
  } else if (obj.classList.contains("img-obj5")) {
    y = 30;
    duration = 0.8;
  } else if (obj.classList.contains("img-obj6")) {
    y = 50;
    duration = 1;
  } else if (obj.classList.contains("scroll-icon")) {
    y = 20;
    duration = 0.5;
  }

  gsap.to(obj, {
    y: y,
    duration: duration,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });
};

// 적용할 요소 모두 선택해서 반복 적용
const arr = document.querySelectorAll(".updown-ani");
arr.forEach((obj) => {
  updownAnimate(obj);
});

/* 공통 fadeUp 효과 */
function createTitleAnimation(sectionId, dur) {
  const isMediumScreen = window.matchMedia("(min-width: 1021px)").matches;

  if (sectionId === "#section04" && isMediumScreen) {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionId,
          start: "top center",
          end: "bottom bottom",
          toggleActions: "play none reverse none",
        },
      })
      .from(`${sectionId} .row1`, { opacity: 0, y: 80, duration: dur })
      .from(`${sectionId} .row2`, { opacity: 0, y: 80, duration: dur });
  } else if (sectionId === "#section05") {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionId,
          start: "top center",
          end: "bottom bottom",
          toggleActions: "play none none none",
        },
      })
      .from(`${sectionId} .row1`, { opacity: 0, y: 80, duration: dur });
  } else {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionId,
          start: "top center",
          end: "bottom bottom",
          toggleActions: "play none none none",
        },
      })
      .from(`${sectionId} .row1`, { opacity: 0, y: 80, duration: dur })
      .from(`${sectionId} .row2`, { opacity: 0, y: 80, duration: dur });
  }
}

/* fadeUp 효과 적용 */
const sec1Title = createTitleAnimation("#section01", 0.5);
const sec2Title = createTitleAnimation("#section02", 0.5);
const sec4Title = createTitleAnimation("#section04", 1);
const sec5Title = createTitleAnimation("#section05", 1);

/* --- 섹션별 이벤트 --- */

/* main-banner */
/* 오디오 버튼 동작 */
const mVideo = document.querySelector("#main-video");
const mAudio = document.querySelector("#main-audio");

mAudio.addEventListener("click", () => {
  mAudio.classList.toggle("on");
  if (mAudio.classList.contains("on")) {
    mVideo.muted = false;
    mVideo.volume = 1;
  } else {
    mVideo.muted = true;
  }
});

/* 헤더 고정시키기 */
const audio = document.querySelector("#main-audio");
const header = document.querySelector("#header");
const logo = header.querySelector(".logo-img");

ScrollTrigger.create({
  trigger: "#main-banner",
  start: "bottom top",
  end: "top bottom",

  onEnter: () => {
    logo.src = logo.dataset.white;
    header.style.opacity = 1;
    //audio.style.display = "block";
  },
  onEnterBack: () => {
    logo.src = logo.dataset.white;
    header.style.opacity = 1;
    //audio.style.display = "block";
  },
  onLeave: () => {
    logo.src = logo.dataset.black;
    header.style.opacity = 1;
    //audio.style.display = "none";
  },
  onLeaveBack: () => {
    logo.src = logo.dataset.white;
    header.style.opacity = 1;
    //audio.style.display = "block";
  },
});

// 헤더 중간 지점 지나면 사라지도록
gsap.to("#header", {
  opacity: 0,
  scrollTrigger: {
    trigger: "#main-banner",
    start: "center center",
    end: "bottom center",
    toggleActions: "play none reverse none", // 스크롤 반대로 되돌리면 다시 보임
  },
});
gsap.to("#main-audio", {
  autoAlpha: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#main-banner",
    start: "center center",
    end: "bottom center",
    toggleActions: "play play reverse reverse", // 스크롤 반대로 되돌리면 다시 보임
  },
});

// top button
gsap.to(".top-btn", {
  duration: 1,
  scrollTrigger: {
    trigger: "#main-banner",
    start: "top bottom",
    end: "bottom 60%",
    markers: false,
    onEnter: () => {
      document.querySelector(".top-btn").style.opacity = 0;
      document.querySelector(".top-btn").style.pointerEvents = "none";
    },
    onEnterBack: () => {
      document.querySelector(".top-btn").style.opacity = 0;
      document.querySelector(".top-btn").style.pointerEvents = "none";
    },
    onLeave: () => {
      document.querySelector(".top-btn").style.opacity = 1;
      document.querySelector(".top-btn").style.pointerEvents = "auto";
    },
    onLeaveBack: () => {
      document.querySelector(".top-btn").style.opacity = 1;
      document.querySelector(".top-btn").style.pointerEvents = "auto";
    },
  },
});

/* section01 */
gsap.from("#section01 .parallax-obj", {
  y: innerHeight * -1,
  autoAlpha: 0,
  ease: "none",
  duration: 3,
  // stagger: 0.1, // 선택사항: 요소 간 약간의 간격을 둘 수 있음
  scrollTrigger: {
    trigger: "#section01", // 모두 같은 트리거로!
    start: "top bottom", // section01이 보일 때 시작
    end: "bottom bottom",
    scrub: 2,
    markers: false,
  },
});

/* section02 */
ScrollTrigger.matchMedia({
  // 배경
  "(min-width: 1021px)": function () {
    gsap.to("#section02 .bg-color", {
      height: "100%",
      ease: "linear",
      scrollTrigger: {
        trigger: "#section02",
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    gsap.to("#section02 .bg-color", {
      width: "50%",
      ease: "linear",
      scrollTrigger: {
        trigger: "#section02",
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: 2,
        markers: false,
      },
    });
  },
});

// 이미지 오브젝트
ScrollTrigger.matchMedia({
  // 1021px 이상일 때
  "(min-width: 1021px)": function () {
    gsap.from("#section02 .img-objs", {
      yPercent: 70,
      scrollTrigger: {
        trigger: "#section02",
        start: "bottom bottom",
        end: "+=100%",
        scrub: 2,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  },

  // 1020px 이하일 때는 pin 없이
  "(max-width: 1020px)": function () {
    gsap.from("#section02 .img-objs", {
      yPercent: 70,
      scrollTrigger: {
        trigger: "#section02",
        start: "bottom bottom",
        end: "+=100%",
        scrub: 2,
        pin: false, // pin 비활성화
        pinSpacing: false,
        markers: false,
      },
    });
  },
});

/* section03 */
let previousIndex = null;

// 1. swiper 초기화
const swiperSec3 = new Swiper(".swiperSec3", {
  loop: false,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 800,
  spaceBetween: 0,
  allowTouchMove: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      // Swiper 초기화 완료 후 애니메이션 실행
      fadeUp(this.activeIndex);
    },
    slideChange: function () {
      const currentIndex = this.activeIndex;
      const previousIndex = this.previousIndex;
      fadeUp(currentIndex, previousIndex);
    },
  },
});
// Swiper 수동 초기화 (init 이벤트가 동작하려면 반드시 필요)
swiperSec3.init();

// 2. 슬라이드 수 계산 (한 번만 실행)
const numSlides = swiperSec3.slides.length;

// 3. 조건에 따라 ScrollTrigger 생성
let scrollTriggerInstance;

ScrollTrigger.matchMedia({
  // 768px 이상일 때
  "(min-width: 768px)": function () {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: "#section03",
      start: "center center",
      end: `+=${numSlides * 100}%`, //   더 직관적
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.round(progress * (numSlides - 1));
        swiperSec3.slideTo(index);
      },
    });
  },

  // 767px 이하일 때는 스크롤 트리거 제거
  "(max-width: 767px)": function () {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill(true); // 강제 제거
      scrollTriggerInstance = null;
      ScrollTrigger.refresh(); // 내부 상태 업데이트
    }
  },
});

/** 4. 슬라이드 등장 애니메이션 함수 */
function fadeUp(curIndex, preIndex) {
  const slides = document.querySelectorAll("#section03 .swiper-slide");
  const prevSlide = slides[preIndex];
  const currentSlide = slides[curIndex];
  if (!currentSlide || !prevSlide) return;

  const imgs = currentSlide.querySelectorAll(".img-wrap > img");
  const title1 = prevSlide.querySelector(".title");
  const title2 = currentSlide.querySelector(".title");

  imgs.forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: 30, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  });
  gsap.to(title1, {
    yPercent: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
  gsap.fromTo(
    title2,
    { yPercent: 50, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  );
}

/* section04 */
const sec4 = gsap.timeline();
sec4.add("start"); // 타임라인 내 'start'라는 라벨(label) 추가
sec4.add("end"); // 타임라인 내 'end'라는 라벨(label) 추가
sec4
  .to("#section04 .bgImg-wrap", { clipPath: "circle(100%)" }, "start")
  .to("#section04 .circle-obj1", { xPercent: -50, yPercent: 50 }, "start")
  .to("#section04 .circle-obj2", { xPercent: 50, yPercent: -50 }, "start")
  .to("#section04 .circle-obj3", { xPercent: 50, yPercent: 50 }, "start")
  .from("#section04 .circle-obj1", { autoAlpha: 0 }, "end")
  .from("#section04 .circle-obj2", { autoAlpha: 0 }, "end")
  .from("#section04 .circle-obj3", { autoAlpha: 0 }, "end");

ScrollTrigger.create({
  animation: sec4,
  trigger: "#section04",
  start: "top top",
  end: "+=100%",
  scrub: 1,
  pin: true,
  pinSpacing: true,
  markers: false,
});

/* section05 */

// 슬라이드 복제 로직
const swiperWrapper05 = document.querySelector("#section05 .swiper-wrapper");
const slides = swiperWrapper05.querySelectorAll(".swiper-slide");
const requiredSlides = 7 + 6; // slidesPerView + loopAdditionalSlides

if (slides.length < requiredSlides) {
  const cloneCount = Math.ceil(
    (requiredSlides - slides.length) / slides.length
  );
  for (let i = 0; i < cloneCount; i++) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      swiperWrapper05.appendChild(clone);
    });
  }
}

/* swiper 초기화 */
const swiperSec5 = new Swiper(".swiperSec5", {
  loop: true,
  slidesPerView: 7,
  spaceBetween: 25,
  speed: 3300, // 이동 속도: 높을수록 천천히 이동
  allowTouchMove: true, // 터치 허용 여부
  loopAdditionalSlides: 6, // 추가 슬라이드 복제 → 마지막 슬라이드에서 멈칫하는 현상 방지
  autoplay: {
    delay: 0, // 끊기지 않고 계속 이동
    disableOnInteraction: false, // 사용자가 마우스 드래그해도 다시 재생됨
  },

  breakpoints: {
    // 반응형
    320: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
    1440: {
      slidesPerView: 7,
    },
    1920: {
      slidesPerView: 10, // 큰 화면에서 빈 공간 방지
    },
  },
});

const mainMenu = document.querySelectorAll(".main-menu");
mainMenu.forEach((menu) => {
  menu.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});

/* swiper 이벤트 */
// swiperWrapper05.addEventListener("mouseenter", function () {
//   swiperSec5.autoplay.stop();
// });
// swiperWrapper05.addEventListener("mouseleave", function () {
//   swiperSec5.autoplay.start();
// });
