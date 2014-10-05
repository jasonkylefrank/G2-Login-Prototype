

$(document).ready(function (e) {

    var currentColorSchemeId = 1;
    var colorSchemes = ['Dark', 'Light', 'Blue'];
    var $currentAuxInfoItem;
    var $previousAuxInfoItem;

    //$(document).on("click", "#mainWrapper", function (e) {
    //    // --- Only handle clicks that were on the wrapper itself - not on child elements        
    //    var wasClickOnTheWrapper = !($(e.target).is('#mainWrapper *'));
    //    if (wasClickOnTheWrapper) {
    //        $('body').toggleClass('Light');
    //        e.stopPropagation();
    //    }
    //});

    // Open Auxillary Info
    $(document).on('click', '#auxInfoButtons li', function (e) {
        var $selectedElement = $(e.target);
        // Get the parent LI in case a child element is the e.target. (for some reason child elements are also being targetted)
        var $selectedLI = $selectedElement.closest('li');
        // --- Change button appearance
        $('#auxInfoButtons li').removeClass('Selected');
        $selectedLI.addClass('Selected');
        // --- Content: Hide previous one and reveal new one
        // Make the current on the previous one
        $previousAuxInfoItem = $currentAuxInfoItem;

        // Make the new one the "current" one
        var newSelectedContentId = '#' + $selectedLI.data('auxInfoId');
        $currentAuxInfoItem = $(newSelectedContentId);

        if ($previousAuxInfoItem) {
            $previousAuxInfoItem.removeClass('Selected');
            // Need to set display none on the previous one after its opacity fades so that 
            //  mouse events can pass through to other aux info items
//            setTimeout(function () { $previousAuxInfoItem.css('display', 'none'); }, 500);
        }
//        $currentAuxInfoItem.css('display', 'block');
        $currentAuxInfoItem.addClass('Selected');
    });

    // Close Aux Info
    $(document).on('click', '.auxInfoItem .CloseAuxInfoButton', function (e) {
        // Change button appearance
        $('#auxInfoButtons li').removeClass('Selected');
        // Hide content
        $('#auxInfo .auxInfoItem').removeClass('Selected');
        $currentAuxInfoItem = $previousAuxInfoItem = null;
    });

    // Color scheme switching
    $(document).on('click', '#colorSchemeButtons span', function (e) {
        
        var $selectedButton = $(e.target);
        var newColorSchemeId = $selectedButton.data('colorSchemeId');

        if (newColorSchemeId != currentColorSchemeId) {
            $('body').removeClass(colorSchemes[currentColorSchemeId - 1]);
            $('body').addClass(colorSchemes[newColorSchemeId - 1]);

            currentColorSchemeId = newColorSchemeId;
            // Make the previously-selected button become unselected and the new one become selected
            $('#colorSchemeButtons .Selected').removeClass('Selected');
            $selectedButton.addClass('Selected');
        }        
    });

    // Open/Close the Options Menu
    $(document).on('click', '.MenuButton, #closeUIOptionsButton, #uiOptions .Button', function (e) {
        $('#uiOptions').toggleClass('Shown');
        $('.MenuButton').toggleClass('MenuShown');
    });

    // Enlarge/Shrink the logo (demonstrate SVG scaling)
    $(document).on("click", ".Logo", function (e) {
        
        $('.Logo').toggleClass('LogoSizeBig');
        e.stopPropagation();
        
    });
    // Enable/Disable Login button based on what has been typed in username/password fields
    $(document).on("keyup", "input", function (e) {

        var isUserNameAndPasswordValid = false;

        var userName = $('#UsernameInput').val();
        var password = $('#PasswordInput').val();

        if (validateEmail(userName) && password.length > 5)
            isUserNameAndPasswordValid = true;      
        
        $('#loginButton').toggleClass('Enabled', isUserNameAndPasswordValid);
        
    });


    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 


    $(document).on('click', '#loginButton', function (e) {
        //location.reload();
        
    });


    $('body').addClass('Loaded');





    /*
     * Replace all SVG images (img tags with svg sources) with inline SVG so we can easily style pieces of the 
     * SVG using CSS.  See: http://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
     */
    /*
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
    */
});
