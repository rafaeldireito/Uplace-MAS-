(function() {

	var viewEl = document.querySelector('.view'),
		gridEl = viewEl.querySelector('.grid'),
		items = [].slice.call(gridEl.querySelectorAll('.product')),
		basket;

	// the compare basket
	function CompareBasket() {
		this.el = document.querySelector('.compare-basket');
		this.compareCtrl = this.el.querySelector('.action--compare');
		this.compareWrapper = document.querySelector('.compare'),
		this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close')

		this.itemsAllowed = 3;
		this.totalItems = 0;
		this.items = [];

		// compares items in the compare basket: opens the compare products wrapper
		this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
		// close the compare products wrapper
		var self = this;
		this.closeCompareCtrl.addEventListener('click', function() {
			// toggle compare basket
			classie.add(self.el, 'compare-basket--active');
			// animate..
			classie.remove(viewEl, 'view--compare');
		});
	}

	CompareBasket.prototype.add = function(item) {
		// check limit
		if( this.isFull() ) {
			return false;
		}

		classie.add(item, 'product--selected');

		// create item preview element
		var preview = this._createItemPreview(item);
		// prepend it to the basket
		this.el.insertBefore(preview, this.el.childNodes[0]);
		// insert item
		this.items.push(preview);

		this.totalItems++;
		if( this.isFull() ) {
			classie.add(this.el, 'compare-basket--full');
		}

		classie.add(this.el, 'compare-basket--active');
	};

	CompareBasket.prototype._createItemPreview = function(item) {
		var self = this;

		var preview = document.createElement('div');
		preview.className = 'product-icon';
		preview.setAttribute('data-idx', items.indexOf(item));

		var removeCtrl = document.createElement('button');
		removeCtrl.className = 'action action--remove';
		removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">Remove product</span>';
		removeCtrl.addEventListener('click', function() {
			self.remove(item);
		});

		var productImageEl = item.querySelector('img.product__image').cloneNode(true);

		preview.appendChild(productImageEl);
		preview.appendChild(removeCtrl);

		var productInfo = item.querySelector('.product__info').innerHTML;
		preview.setAttribute('data-info', productInfo);

		return preview;
	};

	CompareBasket.prototype.remove = function(item) {
		classie.remove(this.el, 'compare-basket--full');
		classie.remove(item, 'product--selected');
		var preview = this.el.querySelector('[data-idx = "' + items.indexOf(item) + '"]');
		this.el.removeChild(preview);
		this.totalItems--;

		var indexRemove = this.items.indexOf(preview);
		this.items.splice(indexRemove, 1);

		if( this.totalItems === 0 ) {
			classie.remove(this.el, 'compare-basket--active');
		}

		// checkbox
		var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
		if( checkbox.checked ) {
			checkbox.checked = false;
		}
	};

	CompareBasket.prototype._compareItems = function() {
		var self = this;

		// remove all previous items inside the compareWrapper element
		[].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function(item) {
			self.compareWrapper.removeChild(item);
		});

		for(var i = 0; i < this.totalItems; ++i) {
			var compareItemWrapper = document.createElement('div');
			compareItemWrapper.className = 'compare__item';

			var compareItemEffectEl = document.createElement('div');
			compareItemEffectEl.className = 'compare__effect';

			compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');
			compareItemWrapper.appendChild(compareItemEffectEl);

			this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
		}

		setTimeout(function() {
			// toggle compare basket
			classie.remove(self.el, 'compare-basket--active');
			// animate..
			classie.add(viewEl, 'view--compare');
		}, 25);
	};

	CompareBasket.prototype.isFull = function() {
		return this.totalItems === this.itemsAllowed;
	};

	function init() {
		// initialize an empty basket
		basket = new CompareBasket();
		initEvents();
	}

	function initEvents() {
		items.forEach(function(item) {
			var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
			checkbox.checked = false;

			// ctrl to add to the "compare basket"
			checkbox.addEventListener('click', function(ev) {
				if( ev.target.checked ) {
					if( basket.isFull() ) {
						ev.preventDefault();
						return false;
					}
					basket.add(item);
				}
				else {
					basket.remove(item);
				}
			});
		});
	}

	init();

})();

jQuery(document).ready(function($){
	function productsTable( element ) {
		this.element = element;
		this.table = this.element.children('.cd-products-table');
		this.tableHeight = this.table.height();
		this.productsWrapper = this.table.children('.cd-products-wrapper');
		this.tableColumns = this.productsWrapper.children('.cd-products-columns');
		this.products = this.tableColumns.children('.product');
		this.productsNumber = this.products.length;
		this.productWidth = this.products.eq(0).width();
		this.productsTopInfo = this.table.find('.top-info');
		this.featuresTopInfo = this.table.children('.features').children('.top-info');
		this.topInfoHeight = this.featuresTopInfo.innerHeight() + 30;
		this.leftScrolling = false;
		this.filterBtn = this.element.find('.filter');
		this.resetBtn = this.element.find('.reset');
		this.filtering = false,
		this.selectedproductsNumber = 0;
		this.filterActive = false;
		this.navigation = this.table.children('.cd-table-navigation');
		// bind table events
		this.bindEvents();
	}

	productsTable.prototype.bindEvents = function() {
		var self = this;
		//detect scroll left inside producst table
		self.productsWrapper.on('scroll', function(){
			if(!self.leftScrolling) {
				self.leftScrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(function(){self.updateLeftScrolling();}, 250) : window.requestAnimationFrame(function(){self.updateLeftScrolling();});
			}
		});
		//select single product to filter
		self.products.on('click', '.top-info', function(){
			var product = $(this).parents('.product');
			if( !self.filtering && product.hasClass('selected') ) {
				product.removeClass('selected');
				self.selectedproductsNumber = self.selectedproductsNumber - 1;
				self.upadteFilterBtn();
			} else if( !self.filtering && !product.hasClass('selected') ) {
				product.addClass('selected');
				self.selectedproductsNumber = self.selectedproductsNumber + 1;
				self.upadteFilterBtn();
			}
		});
		//filter products
		self.filterBtn.on('click', function(event){
			event.preventDefault();
			if(self.filterActive) {
				self.filtering =  true;
				self.showSelection();
				self.filterActive = false;
				self.filterBtn.removeClass('active');
			}
		});
		//reset product selection
		self.resetBtn.on('click', function(event){
			event.preventDefault();
			if( self.filtering ) {
				self.filtering =  false;
				self.resetSelection();
			} else {
				self.products.removeClass('selected');
			}
			self.selectedproductsNumber = 0;
			self.upadteFilterBtn();
		});
		//scroll inside products table
		this.navigation.on('click', 'a', function(event){
			event.preventDefault();
			self.updateSlider( $(event.target).hasClass('next') );
		});
	}

	productsTable.prototype.upadteFilterBtn = function() {
		//show/hide filter btn
		if( this.selectedproductsNumber >= 2 ) {
			this.filterActive = true;
			this.filterBtn.addClass('active');
		} else {
			this.filterActive = false;
			this.filterBtn.removeClass('active');
		}
	}

	productsTable.prototype.updateLeftScrolling = function() {
		var totalTableWidth = parseInt(this.tableColumns.eq(0).outerWidth(true)),
			tableViewport = parseInt(this.element.width()),
			scrollLeft = this.productsWrapper.scrollLeft();

		( scrollLeft > 0 ) ? this.table.addClass('scrolling') : this.table.removeClass('scrolling');

		if( this.table.hasClass('top-fixed') && checkMQ() == 'desktop') {
			setTranformX(this.productsTopInfo, '-'+scrollLeft);
			setTranformX(this.featuresTopInfo, '0');
		}

		this.leftScrolling =  false;

		this.updateNavigationVisibility(scrollLeft);
	}

	productsTable.prototype.updateNavigationVisibility = function(scrollLeft) {
		( scrollLeft > 0 ) ? this.navigation.find('.prev').removeClass('inactive') : this.navigation.find('.prev').addClass('inactive');
		( scrollLeft < this.tableColumns.outerWidth(true) - this.productsWrapper.width() && this.tableColumns.outerWidth(true) > this.productsWrapper.width() ) ? this.navigation.find('.next').removeClass('inactive') : this.navigation.find('.next').addClass('inactive');
	}

	productsTable.prototype.updateTopScrolling = function(scrollTop) {
		var offsetTop = this.table.offset().top,
			tableScrollLeft = this.productsWrapper.scrollLeft();

		if ( offsetTop <= scrollTop && offsetTop + this.tableHeight - this.topInfoHeight >= scrollTop ) {
			//fix products top-info && arrows navigation
			if( !this.table.hasClass('top-fixed') && $(document).height() > offsetTop + $(window).height() + 200) {
				this.table.addClass('top-fixed').removeClass('top-scrolling');
				if( checkMQ() == 'desktop' ) {
					this.productsTopInfo.css('top', '0');
					this.navigation.find('a').css('top', '0px');
				}
			}

		} else if( offsetTop <= scrollTop ) {
			//product top-info && arrows navigation -  scroll with table
			this.table.removeClass('top-fixed').addClass('top-scrolling');
			if( checkMQ() == 'desktop' )  {
				this.productsTopInfo.css('top', (this.tableHeight - this.topInfoHeight) +'px');
				this.navigation.find('a').css('top', (this.tableHeight - this.topInfoHeight) +'px');
			}
		} else {
			//product top-info && arrows navigation -  reset style
			this.table.removeClass('top-fixed top-scrolling');
			this.productsTopInfo.attr('style', '');
			this.navigation.find('a').attr('style', '');
		}

		this.updateLeftScrolling();
	}

	productsTable.prototype.updateProperties = function() {
		this.tableHeight = this.table.height();
		this.productWidth = this.products.eq(0).width();
		this.topInfoHeight = this.featuresTopInfo.innerHeight() + 30;
		this.tableColumns.css('width', this.productWidth*this.productsNumber + 'px');
	}

	productsTable.prototype.showSelection = function() {
		this.element.addClass('filtering');
		this.filterProducts();
	}

	productsTable.prototype.resetSelection = function() {
		this.tableColumns.css('width', this.productWidth*this.productsNumber + 'px');
		this.element.removeClass('no-product-transition');
		this.resetProductsVisibility();
	}

	productsTable.prototype.filterProducts = function() {
		var self = this,
			containerOffsetLeft = self.tableColumns.offset().left,
			scrollLeft = self.productsWrapper.scrollLeft(),
			selectedProducts = this.products.filter('.selected'),
			numberProducts = selectedProducts.length;

		selectedProducts.each(function(index){
			var product = $(this),
				leftTranslate = containerOffsetLeft + index*self.productWidth + scrollLeft - product.offset().left;
			setTranformX(product, leftTranslate);

			if(index == numberProducts - 1 ) {
				product.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					setTimeout(function(){
						self.element.addClass('no-product-transition');
					}, 50);
					setTimeout(function(){
						self.element.addClass('filtered');
						self.productsWrapper.scrollLeft(0);
						self.tableColumns.css('width', self.productWidth*numberProducts + 'px');
						selectedProducts.attr('style', '');
						product.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
						self.updateNavigationVisibility(0);
					}, 100);
				});
			}
		});

		if( $('.no-csstransitions').length > 0 ) {
			//browser not supporting css transitions
			self.element.addClass('filtered');
			self.productsWrapper.scrollLeft(0);
			self.tableColumns.css('width', self.productWidth*numberProducts + 'px');
			selectedProducts.attr('style', '');
			self.updateNavigationVisibility(0);
		}
	}

	productsTable.prototype.resetProductsVisibility = function() {
		var self = this,
			containerOffsetLeft = self.tableColumns.offset().left,
			selectedProducts = this.products.filter('.selected'),
			numberProducts = selectedProducts.length,
			scrollLeft = self.productsWrapper.scrollLeft(),
			n = 0;

		self.element.addClass('no-product-transition').removeClass('filtered');

		self.products.each(function(index){
			var product = $(this);
			if (product.hasClass('selected')) {
				n = n + 1;
				var leftTranslate = (-index + n - 1)*self.productWidth;
				setTranformX(product, leftTranslate);
			}
		});

		setTimeout(function(){
			self.element.removeClass('no-product-transition filtering');
			setTranformX(selectedProducts, '0');
			selectedProducts.removeClass('selected').attr('style', '');
		}, 50);
	}

	productsTable.prototype.updateSlider = function(bool) {
		var scrollLeft = this.productsWrapper.scrollLeft();
		scrollLeft = ( bool ) ? scrollLeft + this.productWidth : scrollLeft - this.productWidth;

		if( scrollLeft < 0 ) scrollLeft = 0;
		if( scrollLeft > this.tableColumns.outerWidth(true) - this.productsWrapper.width() ) scrollLeft = this.tableColumns.outerWidth(true) - this.productsWrapper.width();

		this.productsWrapper.animate( {scrollLeft: scrollLeft}, 200 );
	}

	var comparisonTables = [];
	$('.cd-products-comparison-table').each(function(){
		//create a productsTable object for each .cd-products-comparison-table
		comparisonTables.push(new productsTable($(this)));
	});

	var windowScrolling = false;
	//detect window scroll - fix product top-info on scrolling
	$(window).on('scroll', function(){
		if(!windowScrolling) {
			windowScrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(checkScrolling, 250) : window.requestAnimationFrame(checkScrolling);
		}
	});

	var windowResize = false;
	//detect window resize - reset .cd-products-comparison-table properties
	$(window).on('resize', function(){
		if(!windowResize) {
			windowResize = true;
			(!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
		}
	});

	function checkScrolling(){
		var scrollTop = $(window).scrollTop();
		comparisonTables.forEach(function(element){
			element.updateTopScrolling(scrollTop);
		});

		windowScrolling = false;
	}

	function checkResize(){
		comparisonTables.forEach(function(element){
			element.updateProperties();
		});

		windowResize = false;
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(comparisonTables[0].element.get(0), '::after').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	function setTranformX(element, value) {
		element.css({
		    '-moz-transform': 'translateX(' + value + 'px)',
		    '-webkit-transform': 'translateX(' + value + 'px)',
			'-ms-transform': 'translateX(' + value + 'px)',
			'-o-transform': 'translateX(' + value + 'px)',
			'transform': 'translateX(' + value + 'px)'
		});
	}
});
