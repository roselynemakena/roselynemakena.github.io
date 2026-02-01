// ============================================
// Main JavaScript - Modern Portfolio
// ============================================

$(document).ready(function() {

  // ============================================
  // Typewriter Effect for Name
  // ============================================
  (function() {
    var textToType = "Roselyne M.";
    var typingSpeed = 100;
    var deletingSpeed = 50;
    var pauseDuration = 3000;
    var $element = $('.typewriter-text');
    var $cursor = $('.typewriter-cursor');
    var charIndex = 0;
    var isDeleting = false;

    if ($element.length === 0) {
      console.log('Typewriter element not found');
      return;
    }

    console.log('Typewriter initialized');

    function typeWriter() {
      if (isDeleting) {
        // Deleting characters
        $element.text(textToType.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setTimeout(typeWriter, pauseDuration);
        } else {
          setTimeout(typeWriter, deletingSpeed);
        }
      } else {
        // Typing characters
        $element.text(textToType.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === textToType.length) {
          // Finished typing, pause then start deleting
          setTimeout(function() {
            isDeleting = true;
            typeWriter();
          }, pauseDuration);
        } else {
          setTimeout(typeWriter, typingSpeed);
        }
      }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  })();

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  $('.menu-toggle').click(function() {
    $(this).toggleClass('active');
    $('.nav-links').toggleClass('active');
    $('body').toggleClass('menu-open');
  });

  // Close menu when clicking on a link
  $('.nav-links a').click(function() {
    $('.menu-toggle').removeClass('active');
    $('.nav-links').removeClass('active');
    $('body').removeClass('menu-open');
  });

  // Close menu when clicking outside
  $(document).click(function(e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.menu-toggle').removeClass('active');
      $('.nav-links').removeClass('active');
      $('body').removeClass('menu-open');
    }
  });

  // ============================================
  // Smooth Scroll
  // ============================================
  $('a[href*="#"]').click(function(e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 72
      }, 800, 'easeInOutCubic');
    }
  });

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  var lastScroll = 0;
  $(window).scroll(function() {
    var currentScroll = $(this).scrollTop();

    // Add shadow when scrolled
    if (currentScroll > 50) {
      $('.navbar').css('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.1)');
    } else {
      $('.navbar').css('box-shadow', '0 2px 8px rgba(0, 0, 0, 0.08)');
    }

    // Back to top button visibility
    if (currentScroll > 500) {
      $('.back-to-top').addClass('visible');
    } else {
      $('.back-to-top').removeClass('visible');
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // Active Nav Link on Scroll
  // ============================================
  var sections = $('section');
  var navLinks = $('.nav-links a');

  $(window).scroll(function() {
    var current = '';
    sections.each(function() {
      var sectionTop = $(this).offset().top - 150;
      var sectionBottom = sectionTop + $(this).outerHeight();
      if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionBottom) {
        current = $(this).attr('id');
      }
    });

    navLinks.each(function() {
      $(this).removeClass('active');
      if ($(this).attr('href') === '#' + current) {
        $(this).addClass('active');
      }
    });
  });

  // Trigger once on load
  $(window).trigger('scroll');

  // ============================================
  // Scroll Reveal Animation
  // ============================================
  function revealOnScroll() {
    var elements = $('.skill-card, .project-card, .timeline-item, .stat-item, .about-text, .contact-info');
    var windowHeight = $(window).height();

    elements.each(function() {
      var elementTop = $(this).offset().top;
      var elementVisible = 150;

      if ($(window).scrollTop() + windowHeight > elementTop + elementVisible) {
        $(this).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }
    });
  }

  // Initialize scroll reveal styles
  $('.skill-card, .project-card, .timeline-item, .stat-item, .about-text, .contact-info').css({
    'opacity': '0',
    'transform': 'translateY(30px)',
    'transition': 'opacity 0.6s ease, transform 0.6s ease'
  });

  // Trigger on load and scroll
  revealOnScroll();
  $(window).scroll(revealOnScroll);

  // ============================================
  // Skill Progress Animation
  // ============================================
  function animateSkills() {
    $('.skill-progress').each(function() {
      var elementTop = $(this).offset().top;
      var windowHeight = $(window).height();

      if ($(window).scrollTop() + windowHeight > elementTop) {
        var progressWidth = $(this).css('width');
        $(this).css('width', '0');
        setTimeout(function() {
          $('.skill-progress').css('transition', 'width 1.5s ease');
        }, 100);
        $(this).css('width', progressWidth);
      }
    });
  }

  animateSkills();
  $(window).scroll(animateSkills);

  // ============================================
  // WOW Scroll Spy (for wow.js animations)
  // ============================================
  var wow = new WOW({
    mobile: false,
    offset: 100
  });
  wow.init();

  // ============================================
  // Counter Animation (if needed)
  // ============================================
  function animateCounters() {
    $('.stat-number').each(function() {
      var elementTop = $(this).offset().top;
      var windowHeight = $(window).height();

      if ($(window).scrollTop() + windowHeight > elementTop && !$(this).hasClass('counted')) {
        $(this).addClass('counted');
        var finalValue = $(this).text();
        var numericValue = parseInt(finalValue);
        var duration = 1500;
        var step = numericValue / (duration / 16);
        var current = 0;

        var counter = setInterval(function() {
          current += step;
          if (current >= numericValue) {
            $(this).text(finalValue);
            clearInterval(counter);
          } else {
            $(this).text(Math.floor(current) + '%');
          }
        }, 16);
      }
    });
  }

  // Initialize counters
  $('.stat-number').each(function() {
    $(this).addClass('counted');
  });

  // ============================================
  // Hover Effects for Cards
  // ============================================
  $('.skill-card, .project-card, .timeline-item').hover(
    function() {
      $(this).css('transform', 'translateY(-8px)');
    },
    function() {
      $(this).css('transform', 'translateY(0)');
    }
  );

  // ============================================
  // Active Link Highlight
  // ============================================
  $('.nav-links a').click(function() {
    $('.nav-links a').removeClass('active');
    $(this).addClass('active');
  });

});

// ============================================
// Utility Functions
// ============================================

// Easing function for smooth scrolling
$.easing.easeInOutCubic = function(x, t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
};

// Prevent default on empty links
$('a[href="#"]').click(function(e) {
  e.preventDefault();
});
