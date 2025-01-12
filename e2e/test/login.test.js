const {welcomeScreen,loginScreen} = require('../componentLocators');

describe('Login Screen', () => {
  beforeAll(async () => {
    await device.launchApp(); 
    await element(by.text(welcomeScreen.NEXT_BUTTON)).tap();
    await element(by.text(welcomeScreen.NEXT_BUTTON)).tap();
    await element(by.text(welcomeScreen.GET_STARTED_BUTTON)).tap();
    await waitFor(element(by.id(loginScreen.LOGIN_SCREEN)))
        .toBeVisible()
        .withTimeout(5000);
  });

  //still got an error (view has effective visibility <VISIBLE> and view.getGlobalVisibleRect() covers at least <75> percent of the view's area)
  it('should display the welcome screen', async () => {
    // await expect(element(by.id(loginScreen.EMAIL_INPUT))).toBeVisible();
    await waitFor(element(by.id('signUpLink'))).toBeVisible().withTimeout(5000); 

  });


});