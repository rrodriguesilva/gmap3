describe('plugin', function () {

  beforeEach(function () {
    this.$element = jQuery('<div></div>');
    this.handler = this.$element.gmap3();
  });

  it('should start a gmap3 chain', function () {
    expect(this.$element.length).to.be.equal(1);
    expect(this.handler).to.be.an('object');
    expect(this.handler).not.to.be.an.instanceof(jQuery);
  });

  it('should allow to chain jQuery', function () {
    expect(this.handler.end()).to.be.an.instanceof(jQuery);
    expect(this.handler.end()).to.be.equal(this.$element);
  });

  it('should allow to chain jQuery from each function but "end"', function () {
    var self = this;
    var names = Object.keys(self.handler);
    expect(names.length).to.be.gt(0);
    names.forEach(function (name) {
      if (name !== 'end') { // end return the jQuery chain
        expect(self.handler[name]()).to.be.equal(self.handler);
        expect(self.handler[name]().end()).to.be.an.instanceof(jQuery);
        expect(self.handler[name]().end()).to.be.equal(self.$element);
      }
    });
  });

  it('should handle multiple elements', function (done) {
    this.$element = jQuery('<div></div><div></div><div></div>');
    this.handler = this.$element.gmap3();
    expect(this.$element.length).to.be.equal(3);
    expect(this.handler).to.be.an('object');
    expect(this.handler).not.to.be.an.instanceof(jQuery);

    var maps = [];

    this.handler
      .map()
      .then(function (map) {
        expect(map).to.be.an.instanceof(google.maps.Map);
        maps.push(map)
      })
      .end(function () {
        expect(maps.length).to.be.equal(3);
        // check that all maps are differents one
        expect(maps[0]).not.to.be.equal(maps[1]);
        expect(maps[0]).not.to.be.equal(maps[2]);
        expect(maps[1]).not.to.be.equal(maps[2]);
        done();
      })

  });

});