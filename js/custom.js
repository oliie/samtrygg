// On Document Ready
$( document ).ready(function() {
	 
    var mobileSize = $(window).width() < 850 ;
    var desktopSize = $(window).width() > 850 ;


    // Darken on hover effects
    $('.darken').hover(function() {
        $(this).find('img , video, div').fadeTo(100, 0.9);
    }, function() {
        $(this).find('img , video, div').fadeTo(100, 1);
    });

    // Featherlight Lightbox Settings
    function setLightboxOpen() {
      $('body').css('overflow', 'hidden');
    }

    function setLightboxClosed() {
      $('body').css('overflow', 'auto');
    }
    $(function() {
      $.featherlight.defaults.beforeOpen = setLightboxOpen;
      $.featherlight.defaults.afterClose = setLightboxClosed;
    });
    if (mobileSize){
      $(function() {
        $.featherlight.defaults.beforeOpen = setLightboxOpen;
        $.featherlight.defaults.afterClose = setLightboxClosed;
      });
    }
    $('.lightbox').featherlight({
      closeIcon: '<span class="icon icon-cross-circle"></span>'
    });



    // Datepicker
    $( ".datepicker" ).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        defaultDate: null,
        inline: true
     });
    $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});


    // Show & Hide Alert Elements after delay
    $(".alert-box").show().delay(5000).fadeOut();

    // Show blocks on a-link click
    $('a.show').click( function(e){
        e.preventDefault();
        $(this).next('div').toggleClass( );
    });
    

     // Search Results for all pages, excluding the landing
    var searchBar = $('input#search , input#main-search , input#sm-search');
    var searchResults = $('input#search + .results , input#main-search + .results , input#sm-search + .results');
    var searchResultsLink = $('input#search + .results a, input#main-search + .results a , input#sm-search + .results a');

    $(searchBar).on("focus", function(){
       $(this).next('.results').show();
    });
    $(searchBar).blur( function(){
        setTimeout(function(){ searchResults.fadeOut(); }, 200);
    });
    $(searchResultsLink).hover( function(){
      searchResults.show();
    });
    // $(searchResultsLink).on("focus" , function(){
    //   searchResults.show();
    // });
   



    // Make Footer Sticky on small pages
    var docHeight = $(window).height();
    var footerHeight = $('#footer').height();
    var footerTop = $('#footer').position().top + footerHeight;
     
    if (footerTop < docHeight) {
      $('#footer').css('margin-top', 10 + (docHeight - footerTop) + 'px');
    }

    // Condense Text and add "read more"
    $('.longform').readmore({
        speed: 75,
        moreLink: '<a href="#" class="read-more">läs mer +</a>',
        lessLink: '<a href="#" class="read-less">stäng</a>'
    });

    if ( mobileSize ) {
      $('#support.destination p').readmore({
        speed: 75,
        moreLink: '<a href="#" class="read-more">läs mer +</a>',
        lessLink: '<a href="#" class="read-less">stäng</a>'
      });
    }

    // Basic accordions
    $('.accordion .accord-content').hide();
    $(".accordion .accord-header").click(function() {
      $(this).parent().toggleClass('on');
      if($(this).next("div").is(":visible")){
        $(this).next("div").slideUp("fast");
      } else {
        // $(".accordion .accord-content").slideUp("fast");
        $(this).next("div").slideToggle("fast");
      }
    });


     // --  Dashboard  -- //

     // Close buttons and toggles
    $('.close-module').click(function(e){
      $(this).parents('.module').fadeOut();
      e.preventDefault();
    });
    
    $('.min-module').click(function(e){
      $(this).toggleClass('off');
      $(this).parent().next('.mod-content').slideToggle();
      e.preventDefault();
    });

    $('a.close').click(function(e){
      $(this).parent().remove();
      e.preventDefault();
    });


      // Checkbox groups
      $("input:checkbox").on('click', function() {
        // in the handler, 'this' refers to the box clicked on
        var $box = $(this);
        if ($box.is(":checked")) {
          // the name of the box is retrieved using the .attr() method
          // as it is assumed and expected to be immutable
          var group = "input:checkbox[name='" + $box.attr("name") + "']";
          // the checked state of the group/box on the other hand will change
          // and the current value is retrieved using .prop() method
          $(group).prop("checked", false);
          $box.prop("checked", true);
        } else {
          $box.prop("checked", false);
        }
      });


      // Rental time blocks  
      var checkboxes = $("input[type='checkbox']");

      checkboxes.click(function() {
          $(this).parent('div.time-select').toggleClass('checked');
      });
    

      // Rental Elements
      var now = new Date();

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

      var future = (now.getFullYear()+1)+"-"+(month)+"-"+(day) ;

      $('.icon-start-cal + input').attr('placeholder', today );
      $('.icon-out-cal + input').attr('placeholder', future );
      $('.timeblock input.date').attr('placeholder' , today );

      // Rental Images Sortable
      $( ".gallery.sortable " ).sortable();
      $( ".gallery.sortable " ).disableSelection();

      // Upload links
      $("a.upload-link").on('click', function(e){
          e.preventDefault();
          $("#upload:hidden").trigger('click');
      });

      // Profile Reviews
        // Profile card - select view
      $('.profile-card div.yes input[type="checkbox"]').change(function(){
          if($(this).is(":checked")) {
              $(this).parents('.profile-card').addClass('checked-card');
              $(this).parents('.profile-card').removeClass('cancel-card');
          } else {
              $(this).parents('.profile-card').removeClass('checked-card');
          }
      });

      $('.profile-card div.no input[type="checkbox"]').change(function(){
          if($(this).is(":checked")) {
              $(this).parents('.profile-card').addClass('cancel-card');
              $(this).parents('.profile-card').removeClass('checked-card');
          } else {
              $(this).parents('.profile-card').removeClass('cancel-card');
          }
      });

      // Expand profile images to container
      $('.card-image').find('img').each(function(){
        var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
        $(this).addClass(imgClass);
      });

      // Remove placeholder images ( class ) if an image is present
      $('.accord-content .profile-pic img').each(function () {
        if (this.src.length > 0) {
            $(this).parents('.profile-pic').removeClass('plholder-profile');
          }
      });
      $('.card-image img').each(function () {
        if (this.src.length > 0) {
            $(this).parents('.card-image').removeClass('plholder-profile');
          }
      });

      // Masonry layout of cards
      var $grid = $('#dashboard #grid').masonry({
        itemSelector: '.profile-card',
        percentPosition: true,

      });
      
      $('.profile-card a.show').click(function() {
        $grid.masonry('layout');
      });


      // sidebar nav "active" class added to link if on url
        if($('body#dashboard')){
          $(function() {
            $('.side-nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
          });
        }

        $('.side-nav span.clone').clone().prependTo('nav#nav ul.right');


      // Sidebar Fix / Footer
      if($('body').is('#dashboard')){
        var checkOffset = function () {
          if($('#dashboard .dash-nav').offset().top + $('#dashboard .dash-nav').height() >= $('#dashboard #footer').offset().top - 40){
              $('#dashboard  .dash-nav').css('position', 'relative');
          }
          if($(document).scrollTop() + window.innerHeight < $('#dashboard #footer').offset().top){
              $('#dashboard .dash-nav').css('position', 'fixed'); // restore when you scroll up
          }
        };
      }
      if($('body').is('#dashboard')){
        $(document).scroll(function() {
          checkOffset();
        });
      }
        // $('.dash-nav').fixer();



    //  --  Landing Page  -- //

    // Header Sticky at scroll
      if ($('body').is('#landing')){
          $("nav").addClass("nav-top");
          var header = $("nav");

          $(window).scroll(function() {
              var scroll = $(window).scrollTop();
              var winwidth = $(window).width();

              if (scroll >= 600 && winwidth > 850) {
                  header.removeClass("nav-top");
              } else {
                  header.addClass("nav-top");
              }
          });
          

        $('#dashboard #footer').waypoint(function() {
          $('dash-nav').css('position','absolute');
        }, {
          offset: '20px'
        });

          $(window).resize(function() {
              if (mobileSize) {
                   $('nav ul.right a').removeClass("button");
                }
              else {
                  $('nav ul.right a.radius').addClass("button");
               }
          });

      }

      // Hide and Show Results from main search
      $('#landing .results').hide();

      if ( desktopSize ) {
          var heroInput = $('#landing input#hero-search');
          var heroResults = $('#landing .searchbar .results');
          heroInput.focus(function(){
            heroResults.show();
          });
          heroInput.blur(function(){
            setTimeout(function(){ heroResults.fadeOut(); }, 300);
          });
          $('#landing .searchbar .results a').hover(function(){
            heroResults.show();
          });
      }


    // --  Property Page  -- //

     // Read More or Less Button on Mobile
    if ( mobileSize ) {
      $('#property .description p').readmore({
        speed: 75,
        moreLink: '<a href="#" class="read-more">läs mer +</a>',
        lessLink: '<a href="#" class="read-less">stäng</a>'
      });
    }

    // Carousel(s)
        // Grab main gallery and copy into supporting gallery
    // $("#sup-gallery #sup-gallery-display").html($("#p-gallery").html()+'<a href="#" class="gallery"><img src="img/filler.jpg" alt=""></a>');

    // $("#p-gallery").owlCarousel({
    //     singleItem:true,
    //     navigation:true,
    //     autoPlay : true,
    //     stopOnHover: true,
    //     navigationText:["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"]

    // });

    if ( desktopSize ) {
      $("#sup-gallery #sup-gallery-display").owlCarousel({
          navigation:true,
          autoPlay : true,
          scrollPerPage:true,
          navigationText:["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"]

      });
    }

    // Lightbox in Supporting

    $('a.gallery').featherlightGallery({
        openSpeed: 100,
        previousIcon: '<span class="icon-chevron-left"></span>',
        nextIcon: '<span class="icon-chevron-right"></span>',
        closeIcon: '<span class="icon icon-cross-circle"></span>',
        galleryFadeIn: 100, 
        galleryFadeOut: 100 

    });

    $('a.see-gallery').featherlight({
      targetAttr: 'href',
      variant: 'attached'
    });


    // Tooltip
      $('a.tooltips span').hide();

      if ( desktopSize ) {
          $('a.tooltips').click(function(e){ e.preventDefault(); }); 
          $('a.tooltips').hover(function() { 
            $( this ).children('span').fadeIn(250);
            }, function() { 
                $( this ).children('span').fadeOut(200);
                $('a.tooltips span').hide(); 
          });
      } else {

        $('a.tooltips').click(function(e) {
          $( this ).children('span.arrow-box').css('display','block').delay(3000).fadeOut(); 
          e.preventDefault();
        });

    }

    // --  Search Page  -- //

      // fade in effects

      // Show filters on search input
      $('input#main-search').keypress(function() {
          $('.filter-ops').slideDown(function(){
            $('.sm-circle .icon-chevron-down-2').toggleClass('filter-select' , $(this).is(':visible'));
          });
          $(this).focus();
      });

      // Hide filters on form submit
      $('#filters form').on('submit', function () { 
        $('.filter-ops').slideUp();
      });

      // Show & Hide filters on toggle button
      $('.sm-circle').click(function(){
        $('.filter-ops').slideToggle(function(){
          $('.sm-circle .icon-chevron-down-2').toggleClass('filter-select' , $(this).is(':visible'));
        });
      });

      // List & Grid View
      if (desktopSize){ 
        $('#list-view').hide();
        $('button.grid-view').addClass('selected');
      }
      if (mobileSize){ 
        $('#grid-view').hide();
        $('button.list-view').addClass('selected');
      }

      $('.controls button').on('click',function() {
          if ($(this).hasClass('grid-view')) {
              $('#list-view').fadeOut(500,function(){
                  $('#grid-view').fadeIn(500);
              });
              $('button.list-view').removeClass('selected');
              $('button.grid-view').addClass('selected');
          }
          else if($(this).hasClass('list-view')) {
              $('#grid-view').fadeOut(500,function(){
                  $('#list-view').fadeIn(500);
              });
              $('button.list-view').addClass('selected');
              $('button.grid-view').removeClass('selected');
          }
      });

      // List view accordion
      $('#list-view .panel').hide();

      $('#list-view .accordion').click(function(e){
        $(this).toggleClass('ex-accordion');
        $(this).children('.expand').children('a').toggleClass('panel-select');
        $(this).next('.panel').slideToggle('fast');
        e.preventDefault();
      });

      $('body#search #results #grid-view .large-4.columns.block:last-child').addClass('end');


    
    // --  Landlord Page  --  //

      $('#points div.columns').addClass('fx fadeInUp');
      $('#landlord header, #landlord .calculator, #landlord #info-text').addClass('fx fadeIn');
      $('.info-circle').addClass('fx slideInDown');
      $('.counter').counterUp({
          delay: 10,
          time: 700
      });

      // Silly wayfinder animation
      var wow = new WOW({
        boxClass:     'fx',     
        animateClass: 'animated',
        offset:       0,         
        mobile:       false,      
        live:         true       
      });
      wow.init();


   //  --  FOR DEV / can remove for production if need be -- //

   // Logged in Nav - For Testing on Front Page
    if ($('body').hasClass('logged')){
      $('#nav').addClass('logged');
      $('.top-bar-section ul.right li:nth-last-child(2)').hide();
      $('.top-bar-section ul.right li:last-child').hide();
      $('.top-bar-section ul.right').append('<li class="logged"><a href="index.html" class="button button-outline">Logga Ut</a></li>');
    }

   // Placeholder to create timeblock object
    $('a.add-button').click(function(e){
        e.preventDefault();
        $('<div class="timeblock col medium-4 small-12"><h6>Visningstid:</h6><input type="text" class="datepicker date"><select><option value="" selected="selected">Välj klockslag</option><option value="07:00" >07:00 - 08:00</option><option value="08:00" >08:00 - 09:00</option><option value="09:00" >09:00 - 10:00</option><option value="10:00" >10:00 - 11:00</option><option value="11:00" >11:00 - 12:00</option><option value="12:00" >12:00 - 13:00</option><option value="13:00" >13:00 - 14:00</option><option value="14:00" >14:00 - 15:00</option><option value="15:00" >15:00 - 16:00</option><option value="16:00" >16:00 - 17:00</option><option value="17:00" >17:00 - 18:00</option><option value="18:00" >18:00 - 19:00</option><option value="19:00" >19:00 - 20:00</option><option value="20:00" >20:00 - 21:00</option><option value="21:00" >21:00 - 22:00</option><option value="22:00" >22:00 - 23:00</option><option value="23:00" >23:00 - 24:00</option></select><a href="#" class="close"><span class="icon icon-cross-circle"></span></a><div class="repeat-time"><input type="checkbox" value="" /><label >Samma tid/veckodag efterföljande veckor</label></div></div>').prependTo($('#specific-times'));
        $('a.close').click(function(e){
          $(this).parent().remove();
          e.preventDefault();
        });
        // Datepicker
        $( ".datepicker" ).datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            defaultDate: null,
            inline: true
         });
      });  
    
    // // Fade in effects on scroll
    // $('section#visit div').addClass('fx fadeIn');

    // $('#rebook, #cancel').on('click', function (){
      //   $(this).datepicker('destroy').datepicker({
      //       dateFormat: "yy-mm-dd",
      //       changeMonth: true,
      //       defaultDate: null,
      //       inline: true
      //    });
      // });

      // $('#rebook').hide();
      // $('#rebook, #cancel').on('click', function (){
      //   $(this).show();
      // });

      
      // Old Dashboard
      // if($('body#dashboard') && mobileSize){
        //     $('.side-nav span.clone').prependTo('nav#nav ul.right');
        // }
        // sidebar nav for mobile & "active" class added
        // if($('body#dashboard') && mobileSize){
        //   $('.side-nav span').prependTo('nav#nav ul.right').ready(function() {
        //     $('ul.right li a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
        //   });
        // }
    
        // $(window).on('resize', function(){
        //     if($('body#dashboard') && desktopSize){
        //       $('nav#nav ul.right span.clone').prependTo('.dash-nav .side-nav');
        //       console.log('this');
        //     } else if($('body#dashboard') && mobileSize){
        //       $('.side-nav span.clone').prependTo('nav#nav ul.right');
        //       console.log('that');
        //     }
        // });

        // Tristate checkboxes
        // $('.amenities input').tristate();
        // $('.amenities li a').click(function(e){
        //     $(this).prev().tristate('state', null);
        //     e.preventDefault();
        // });
	
});

$(window).fadeThis({
   reverse: false,
   speed: 300,
   distance: 50
});


// On Window Load
$( window ).load(function() { 

	$('video').fadeIn(300);

	   
});

$(document).foundation({
  accordion: {
    content_class: 'content',
    active_class: 'active',
    multi_expand: true,
    toggleable: true
  }

});

// $(function() {
//   FastClick.attach(document.body);
// });