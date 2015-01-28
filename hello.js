var Logout = (function($){
  return {
    github: function(){
      $('.logout-form').submit();
    },
    facebook: function(){
      $('#logout_form').submit();
    }
  };
})(jQuery);