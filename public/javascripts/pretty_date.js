/*
 * JavaScript Pretty Date
 * Copyright (c) 2008 John Resig (jquery.com)
 * Licensed under the MIT license.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time){
  var date = new Date(Date.parse(time)),
    diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff)) return;

  return day_diff < 0 && (
      day_diff == -1 && (
        diff > -60 && "in just a second" ||
        diff > -120 && "in a minute" ||
        diff > -3600 && "in " + Math.floor(-diff / 60) + " minutes" ||
        diff > -7200 && "in an hour or so" ||
        diff > -86400 && "in " + Math.floor(-diff / 3600) + " hours") ||
      day_diff == -2 && "Tomorrow" ||
      day_diff > -8 && (-1 - day_diff) + " days from now" ||
      day_diff > -48 && Math.ceil((-1 - day_diff) / 7) + " weeks from now" ||
      day_diff > -365 * 1.5 && "about " + Math.round((-1 - day_diff) / 30) + " months from now" ||
      day_diff > -365 * 2 && "about two years from now" ||
      "over " + Math.floor((-1 - day_diff) / 365) + " years from now"
    ) ||
    day_diff == 0 && (
      diff < 60 && "just now" ||
      diff < 120 && "a minute ago" ||
      diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
      diff < 7200 && "an hour ago" ||
      diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    day_diff < 48 && Math.ceil(day_diff / 7) + " weeks ago" ||
    day_diff < 365 * 1.5 && "about " + Math.round(day_diff / 30) + " months ago" ||
    day_diff < 365 * 2 && "almost two years ago" ||
    "over " + Math.floor(day_diff / 365) + " years ago";
}

// If jQuery is included in the page, adds a jQuery plugin to handle it as well
if (typeof jQuery != "undefined") {
  jQuery.fn.prettyDate = function() {
    return this.each(function() {
      var el = jQuery(this),
        originalDate = el.data('originalDate') || el.text(),
        date = prettyDate(originalDate);

      if (date) {
        el.text(date);
        el.data('originalDate', originalDate)
      }
    });
  };
}