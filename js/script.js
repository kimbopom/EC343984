(function ($) {

  "use strict";

  $(document).ready(function () {


    $('.navbar').on('click', '.search-toggle', function (e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });

  // background color when scroll 
  var initScrollNav = function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.nav-header.fixed-top').addClass("bg-black");
    } else {
      $('.nav-header.fixed-top').removeClass("bg-black");
    }
  }

  $(window).scroll(function () {
    initScrollNav();
  });

    // close when click off of container
    $(document).on('click touchstart', function (e) {
      if (!$(e.target).is('.search-toggle, .search-toggle *, .navbar, .navbar *')) {
        $('.search-toggle').removeClass('active');
        $('.navbar').removeClass('show');
      }
    });

    // Responsive Navigation with Button
    var initHamburgerMenu = function () {
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".menu-list");

      hamburger.addEventListener("click", mobileMenu);

      function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("responsive");
      }

      const navLink = document.querySelectorAll(".nav-link");

      navLink.forEach(n => n.addEventListener("click", closeMenu));

      function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("responsive");
      }
    };

    //quantity in product
    var initquantity = function () {
      const incrementButton = document.querySelector('.incriment-button');
      const decrementButton = document.querySelector('.decriment-button');
      const inputField = document.querySelector('.spin-number-output');

      // Add event listener to increment button
      incrementButton.addEventListener('click', () => {
        let currentValue = parseInt(inputField.value);
        inputField.value = currentValue + 1;
      });

      // Add event listener to decrement button
      decrementButton.addEventListener('click', () => {
        let currentValue = parseInt(inputField.value);
        if (currentValue > 0) {
          inputField.value = currentValue - 1;
        }
      });
    };

    // init jarallax parallax
    var initJarallax = function () {
      jarallax(document.querySelectorAll(".jarallax"));

      jarallax(document.querySelectorAll(".jarallax-img"), {
        keepImg: true,
      });
    }

    // init Chocolat light box
    var initChocolat = function () {
      Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
      });
    };

    // Payment method
    $('input[type="radio"]').click(function () {
      var inputValue = $(this).attr("value");
      var targetBox = $("." + inputValue);
      $(".payment-box").not(targetBox).hide();
      $(targetBox).show();
    });


    // document ready
    $(document).ready(function () {

      var swiper = new Swiper(".main-swiper", {
        speed: 1500,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },

        navigation: {
          nextEl: ".swiper-arrow-next",
          prevEl: ".swiper-arrow-prev",
        },
        pagination: {
          el: ".swiper-pagination1",
          clickable: true,
        },
      });

      var swiper = new Swiper(".product-swiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          599: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1599: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        },
      });

      var swiper = new Swiper(".testimonial-swiper", {
        loop: true,
        navigation: {
          nextEl: ".icon-arrow.icon-arrow-right",
          prevEl: ".icon-arrow.icon-arrow-left",
        },
        pagination: {
          el: "#testimonials .swiper-pagination",
          clickable: true,
        },
      });

          // product single page
    var thumb_slider = new Swiper(".thumb-swiper", {
      loop: true,
      slidesPerView: 4,
      autoplay: true,
      direction: "vertical",
      spaceBetween: 30,
    });

    var large_slider = new Swiper(".large-swiper", {
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

      // var swiper = new Swiper(".thumb-swiper", {
      //   slidesPerView: 1,
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true,
      //   },
      // });

      // var swiper2 = new Swiper(".large-swiper", {
      //   spaceBetween: 10,
      //   effect: 'fade',
      //   thumbs: {
      //     swiper: swiper,
      //   },
      // });


      $(".youtube").colorbox({
        iframe: true,
        innerWidth: 960,
        innerHeight: 585
      });

      initHamburgerMenu();
      initChocolat();
      initJarallax();
      initquantity();



    });

  }); // End of a document

  

})(jQuery);

document.addEventListener("DOMContentLoaded", function() {
  // Get all elements
  const cartItems = document.querySelectorAll('tbody tr');
  const cartTotalElement = document.querySelector('.order-total span');
  const subtotalElement = document.querySelector('.subtotal span');

  function updateCartTotal() {
    let total = 0;
    cartItems.forEach(item => {
      const priceElement = item.querySelector('.price');
      const qtyElement = item.querySelector('.spin-number-output');
      const price = parseFloat(priceElement.textContent.replace('$', ''));
      const quantity = parseInt(qtyElement.value);

      total += price * quantity;
    });
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    subtotalElement.textContent = `$${total.toFixed(2)}`;
  }

  cartItems.forEach(item => {
    const incrementBtn = item.querySelector('.increment-button');
    const decrementBtn = item.querySelector('.decrement-button');
    const qtyInput = item.querySelector('.spin-number-output');
    const removeBtn = item.querySelector('.remove-item');
    
    // Increment quantity
    incrementBtn.addEventListener('click', () => {
      let currentQty = parseInt(qtyInput.value);
      qtyInput.value = currentQty + 1;
      updateCartTotal();
    });

    // Decrement quantity
    decrementBtn.addEventListener('click', () => {
      let currentQty = parseInt(qtyInput.value);
      if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
        updateCartTotal();
      }
    });

    // Remove item from cart
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      item.remove();
      updateCartTotal();
    });
  });

  // Initial calculation
  updateCartTotal();
});



document.addEventListener("DOMContentLoaded", function () {
  const reviewTimes = document.querySelectorAll('.review-time'); // Select all elements with class 'review-time'
  
  reviewTimes.forEach(function (timeElement) {
      const reviewDate = new Date(timeElement.getAttribute('data-date')); // Get the review date from 'data-date' attribute
      const currentDate = new Date(); // Get the current date
      const timeDifference = currentDate - reviewDate; // Calculate the difference in milliseconds

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      let timeAgoText = ''; // Variable to hold the final output text

      // Calculate the output text based on the number of days
      if (days < 1) {
          timeAgoText = "Today";
      } else if (days < 30) {
          timeAgoText = `${days} day${days > 1 ? 's' : ''} ago`; // Display days
      } else if (days < 365) {
          const months = Math.floor(days / 30); // Convert days to months
          timeAgoText = `${months} month${months > 1 ? 's' : ''} ago`; // Display months
      } else {
          const years = Math.floor(days / 365); // Convert days to years
          timeAgoText = `${years} year${years > 1 ? 's' : ''} ago`; // Display years
      }

      // Update the content of the time element
      timeElement.textContent = timeAgoText;
  });
});



const quantitySelector = document.getElementById("quantity-selector");
const priceElement = document.getElementById("dynamic-price");
const oldPriceElement = document.getElementById("old-price");
const buttonElement = document.getElementById("dynamic-button");

quantitySelector.addEventListener("change", function () {
  const selectedOption = quantitySelector.options[quantitySelector.selectedIndex];
  const selectedPrice = selectedOption.getAttribute("data-price");
  const selectedOldPrice = selectedOption.getAttribute("data-old-price");
  const selectedLink = selectedOption.getAttribute("data-link");

  // Update price
  priceElement.textContent = "€" + selectedPrice + ".00";
  
  // Update old price
  oldPriceElement.textContent = "€" + selectedOldPrice + ".00";

  // Update button link
  buttonElement.setAttribute("data-link", selectedLink);
});

// Redirect to specific link when button is clicked
function redirectToLink() {
  const selectedOption = quantitySelector.options[quantitySelector.selectedIndex];
  const selectedLink = selectedOption.getAttribute("data-link");

  // Redirect to the selected link
  window.location.href = selectedLink;
}

