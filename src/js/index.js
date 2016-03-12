(function(){

	for (var y = 10768; y < 10768 + 4; y++) {
		
		for (var x = 16828; x < 16828 + 4; x++) {
			var tile = document.createElement('img');
			tile.setAttribute('class','tile');
			tile.setAttribute('data-order', x + '|' + y);
			tile.setAttribute('src', 'https://localfocusplanet.appspot.com/mono-clean/nl/2/15/' + x + '/' + y + '.png');
			
			document.querySelector('.bucket > .bucket__item').appendChild(tile);

			var target = document.createElement('div');
			target.setAttribute('data-order', x + '|' + y);
			document.querySelector('.target').appendChild(target);
		};
	};

	interact('.bucket__item img')
      .draggable({
        inertia: false,
        onmove: function(event){
          var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          target.style.left = x + 'px';
          target.style.top = y + 'px';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
        onstart:function(event){
          event.target.classList.add('dragging');
        },
        onend: function(event){
          var drag = event.target;
          drag.style.left = null;
          drag.style.top = null;
          drag.removeAttribute('data-x');
          drag.removeAttribute('data-y');
          drag.classList.remove('dragging');
        }
      });

    interact('.target div').dropzone({
      accept: '.bucket img',
      overlap: 0.75,
      ondrop: function (event) {
        var drag = event.relatedTarget;
        var drop = event.target;

        if(drag.getAttribute('data-order') === drop.getAttribute('data-order')){
          // Success! Tile has been placed.
          drop.appendChild(drag); 
        }
      }
    });
    
    
})();