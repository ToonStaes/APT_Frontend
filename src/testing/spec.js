describe('Testing foody\'s with protractor', function() {
  var bestellingen = element.all(by.id('bestellingen')).all(by.id('bestelnummer'));
  var bestellingenUpdated = null;
  var nieuweBestellingBtn = element(by.id('nieuweBestellingBtn'));
  var addBestellingBtn = element(by.id('addBestellingBtn'));
  var editBestellingBtn = element(by.id('editBestellingBtn'));
  var bestellingenNav = element(by.id('bestellingenNav'));

  function verwijderBestellingNetToegevoegd() {
    bestellingenNav.click();
    var bestellingenBtn = element.all(by.id('bestellingen')).all(by.id('deleteBestellingBtn'));
    bestellingenBtn.last().click();
  }

  function nieuweBestelling() {
    bestellingenNav.click();
    nieuweBestellingBtn.click();

    element(by.cssContainingText('option', 'Niels Verheyen')).click();
    var gerechten = element.all(by.id('gerechten')).all(by.css('p'));
    gerechten.get(1).click();
    gerechten.get(2).click();
    addBestellingBtn.click();
    bestellingenNav.click();
    bestellingenUpdated = element.all(by.id('bestellingen')).all(by.id('bestelnummer'));
  }

  function navigateToDetailFirst() {
    bestellingenNav.click();

    var bestellingenBtn = element.all(by.id('bestellingen')).all(by.id('detailBestellingBtn'));
    var bestelnummer = bestellingen.get(0).getText();
    bestellingenBtn.get(0).click();
    return bestelnummer;
  }

  function editBestelling() {
    editBestellingBtn.click();
    element(by.cssContainingText('option', 'Niels Verheyen')).click();
    var gerechten = element.all(by.id('gerechten')).all(by.css('p'));
    gerechten.get(1).click();
    gerechten.get(2).click();

    addBestellingBtn.click();
    personeel = element(by.id('personeelslid')).getText()
    gerechten = element.all(by.id('gerechten'));
    aantalGerechten = gerechten.count();
    returnWaarden = {"personeel": personeel, "aantal": aantalGerechten};

    return returnWaarden;
  }

  function returnOriginalValuesBeforeEdit() {
    editBestellingBtn.click();
    element(by.cssContainingText('option', 'Bert Moons')).click();
    var gerechten = element.all(by.id('gerechten')).all(by.css('p'));
    gerechten.get(1).click();
    gerechten.get(2).click();

    addBestellingBtn.click();
    personeel = element(by.id('personeelslid')).getText()
    gerechten = element.all(by.id('gerechten'));
    aantalGerechten = gerechten.count();
    returnWaarden = {"personeel": personeel, "aantal": aantalGerechten};

    return returnWaarden;
  }

  beforeEach(function (){
    browser.get('http://localhost:4200/');
  });

  it('should add bestelling', function() {
    nieuweBestelling();
    expect(bestellingen.count()).toEqual(bestellingenUpdated.count());
    verwijderBestellingNetToegevoegd()
    expect(bestellingen.count()).toEqual(4);
  });

  it('should edit bestelling', function() {
    bestelnummer = navigateToDetailFirst();
    expect(element(by.css('h2')).getText()).toEqual(bestelnummer)
    returnWaarden = editBestelling();
    expect(returnWaarden.personeel).toEqual("Personeelslid: Niels Verheyen");
    expect(returnWaarden.aantal).toEqual(1);
    returnWaarden2 = returnOriginalValuesBeforeEdit();
    expect(returnWaarden2.personeel).toEqual("Personeelslid: Bert Moons");
    expect(returnWaarden2.aantal).toEqual(3);
  });
})