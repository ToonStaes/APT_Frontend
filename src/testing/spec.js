describe('Testing foody\'s with protractor', function() {
  var bestellingen = element.all(by.id('bestellingen')).all(by.id('bestellingnummer'));
  var bestellingenUpdated = null;
  var deleteBestellingBtn = element(by.id('deleteBestellingBtn'));
  var nieuweBestellingBtn = element(by.id('nieuweBestellingBtn'));
  var addBestelling = element(by.id('addBestellingBtn'))
  var homeNav = element(by.id('homeNav'));
  var bestellingenNav = element(by.id('bestellingenNav'));
  var personeelNav = element(by.id('personeelNav'));

  function nieuweBestelling() {
    bestellingenNav.click();
    nieuweBestellingBtn.click();

    element(by.cssContainingText('option', 'Niels Verheyen')).click();
    var gerechten = element.all(by.id('gerechten')).all(by.css('p'));
    gerechten.get(1).click();
    gerechten.get(2).click();
    addBestelling.click();
    bestellingenNav.click();
    bestellingenUpdated = element.all(by.id('bestellingen')).all(by.id('bestellingnummer'));
  }

  beforeEach(function (){
    browser.get('http://localhost:4200/');
  })


  it('should add bestelling', function() {
    nieuweBestelling();
    expect(bestellingen.count()).toEqual(bestellingenUpdated.count());
  })
})