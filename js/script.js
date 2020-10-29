var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


// Back to top button

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 100;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
};

// Calculator 

$(function() {
  var mCount = $('.m-count'),
    floorNumber = $('.floor-number'),
    typeOfHouse = $('input[name="typeOfHouse"]').val(),
    project = $('input[type="checkbox"]'),
    price = $('#price'),
    basePrice = 30000,
    design = 0;
    finalPrice = 900000,
    countBtn = $('#countBtn'),
    
  mCount.change(function() {
    if ($(this).val() > 20) {
      $(this).tooltip('dispose');
      finalPrice = (+mCount.val() * basePrice) * +floorNumber.val() * +typeOfHouse + design;
      
      // price.text(finalPrice);
    } else {
      $(this).tooltip('toggle');
    }
  });
  floorNumber.change(function(event) {
      var finalPrice = (+mCount.val() * basePrice) * +floorNumber.val() * +typeOfHouse + design;
      // price.text(finalPrice);
  });
  $('input[name="typeOfHouse"]').change(function(event) {
      typeOfHouse = $(this).val();
      finalPrice = (+mCount.val() * basePrice) * +floorNumber.val() * +typeOfHouse + design;
      // price.text(finalPrice);
      // Change image on other option
      /* if ($(this).val() == 1) {
        $('img').attr('src', 'img/wooden_house.jpg');
      } else if ($(this).val() == 2) {
        $('img').attr('src', 'img/brick_house.png');
      } */
  });
  project.change(function(event) {
    if ($(this).is(':checked')) {
      design = 15000;
      finalPrice = (+mCount.val() * basePrice) * +floorNumber.val() * +typeOfHouse + design;
      price.text(finalPrice);
    } else {
      design = 0;
      finalPrice = (+mCount.val() * basePrice) * +floorNumber.val() * +typeOfHouse + design;
      price.text(finalPrice);
    }
  })
  $("#countBtn").click(function() {
    finalPrice = (+mCount.val() * basePrice) * +floorNumber.val() * +typeOfHouse + design;
    price.text(finalPrice);
    $("#price").each(function() {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
        duration: 1000,
        easing: 'swing',
        step: function () {
          $this.text(Math.ceil(this.Counter));
        }
      });
    })
  })
});



$(document).ready(function() {
  
  // Input Mask 
  $('#input-phone').inputmask("+7 (999) 999-99-99");

  //E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Спасибо!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
  });  
});
