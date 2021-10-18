

export default function(to, from) {
      if (from.path != to.path) {
        if (to.hash) {
          setTimeout(() => {
            return window.scrollTo({
              top: document.querySelector(to.hash).offsetTop,
              behavior: 'smooth' });
          }, 500);
        } else {
          return window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }

      if (to.hash) {
        var doc = document.querySelector(to.hash);
        if (doc == null) {
          return window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth' });
      }
    }
