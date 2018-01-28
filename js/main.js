var modal = (function () {
    var method = {},
        $overlay,
        $modal,
        $close;
    method.center = function () {
        var top, left;
        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
        $modal.css({
            top: top + $(window).scrollTop(),
            left: left + $(window).scrollLeft()
        });
    };
    method.open = function () {
        $modal.css({
            width: 'auto',
            height: 'auto'
        });
        method.center();
        $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
    };
    method.close = function () {
        $modal.hide();
        $overlay.hide();
        $(window).unbind('resize.modal');
    };
    $overlay = $('#overlay');
    $modal = $('#loginModal');
    $close = $('#close');
    $modal.hide();
    $overlay.hide();
    $close.click(function (e) {
        e.preventDefault();
        method.close();
    });

    return method;
}());
(function () {
    var eventDelegatorClass = '.sidebar',
        loginModalButtonId = '#openLoginModal',
        contentClass = '.tab__content',
        tabButtonClass = '.tab__link',
        activetabButtonClass = 'tab__link--active',
        activeContentClass = 'tab__content--active';

    function toggleSideBar(event) {
        var contentSection = '#' + event.currentTarget.id,
            contentSectionId = '#' + event.currentTarget.id + 'Content';
        $(tabButtonClass).not(contentSection).removeClass(activetabButtonClass).end().siblings(contentSection).addClass(activetabButtonClass);
        $(contentClass).not(contentSectionId).removeClass(activeContentClass).end().siblings(contentSectionId).addClass(activeContentClass);
    }

    function buildTableData() {
        function mycomparator(a,b) {
            return b.earnings - a.earnings;
        }
        bankData.sort(mycomparator);
        var ratesTableBody = $('#rates > tbody');
        for(var i = 0; i < bankData.length; i++){
            ratesTableBody.append('<tr class="rates__data"> <td>'+ bankData[i].name  + '</td> <td>' + bankData[i].apy + '%</td> <td>$' + bankData[i].earnings + '</td> </tr>');
        }
    }

    $(eventDelegatorClass).on('click', tabButtonClass, toggleSideBar);
    $(eventDelegatorClass).on('click', loginModalButtonId, modal.open);
    $(window).on('load', buildTableData);
})();


