// jQuery v3.3.1 is supported
jQuery(function ($) {
    // Notification element
    var _notification = $('.notification');

    // Notification icon
    var _nIcon = $('.notification__icon');

    // Notification title
    var _nTitle = $('.notification__title');

    // Notification text
    var _nText = $('.notification__text');

    // Notification button
    var _button = $('.notification__button');

    // Statuses
    var _statuses = $('.colors a');

    // Notification button click
    _button.click(function (event) {
        event.preventDefault();
        _notification.removeClass('-open');
        autoOpen();
    });

    // On status click
    _statuses.click(function (event) {
        event.preventDefault();
        // Get the color
        var _status = $(this).data('status');

        // Check if status found
        if (!_status.length)
            return;

        _statuses.removeClass('-active');

        // Check if open
        var _open = _notification.hasClass('-open');

        // Remove all classes besides the notification class
        _notification.attr('class', 'notification' + (_open ? ' -open' : ''));

        // Add the status
        _notification.addClass(_status);

        // Change text
        var _title = 'Oh snap!';
        var _text = 'An error has occured while creating an error report.';
        var _buttonText = 'Dismiss';
        var _icon = 'fas fa-exclamation-circle';

        switch (_status) {
            case '-warning' :
                _title = 'Invalid data provided';
                _text = 'You have provided invalid data when submitting a form';
                _buttonText = 'Let\'s fix it';
                _icon = 'fas fa-exclamation-triangle';
                break;
            case '-info' :
                _title = 'Hey there!';
                _text = 'When accessing the hidden data you should enable some options';
                _buttonText = 'Got it!';
                _icon = 'fas fa-info-circle';
                break;
            case '-success' :
                _title = 'Grade A !';
                _text = 'Your profile was succesfully updated and new data will appear on your timeline.';
                _buttonText = 'Done!';
                _icon = 'far fa-check-circle';
                break;
        }

        _nTitle.text(_title);
        _nText.text(_text);
        _button.text(_buttonText);

        _nIcon.attr('class', 'notification__icon ' + _icon);

        $(this).addClass('-active');
    });

    // Auto open notification
    function autoOpen($ms = 2000) {
        setTimeout(function () {
            _notification.addClass('-open');
        }, $ms);
    }

    autoOpen(300);
});