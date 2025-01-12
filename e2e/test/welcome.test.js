const {welcomeScreen,loginScreen} = require('../componentLocators');

describe('Welcome Screen', () => {
  beforeAll(async () => {
    await device.launchApp(); 
  });

  it('should display the welcome screen', async () => {
    await expect(element(by.id(welcomeScreen.SKIP_BUTTON))).toBeVisible();
    await expect(element(by.id(welcomeScreen.WELCOME_TITLE))).toBeVisible();
    await expect(element(by.id(welcomeScreen.WELCOME_DESCRIPTION))).toBeVisible();
  });

  it('should allow user to swipe through slides', async () => {
    await element(by.id(welcomeScreen.SLIDES)).swipe('left');
    await expect(element(by.id(welcomeScreen.WELCOME_TITLE))).toBeVisible();
    await element(by.id(welcomeScreen.SLIDES)).swipe('right');
    await expect(element(by.id(welcomeScreen.WELCOME_DESCRIPTION))).toBeVisible();
  });

  it('should navigate to login screen when skip button is clicked', async () => {
    await device.reloadReactNative();
    await element(by.id(welcomeScreen.SKIP_BUTTON)).tap();
    await waitFor(element(by.id(loginScreen.LOGIN_SCREEN))).toBeVisible().withTimeout(5000);
  });

  it('should navigate to the next slide or login screen when next button is clicked', async () => {
    await device.reloadReactNative();
    await element(by.text(welcomeScreen.NEXT_BUTTON)).tap();
    await element(by.text(welcomeScreen.NEXT_BUTTON)).tap();
    await element(by.text(welcomeScreen.GET_STARTED_BUTTON)).tap();
    await waitFor(element(by.id(loginScreen.LOGIN_SCREEN)))
        .toBeVisible()
        .withTimeout(5000);
    await expect(element(by.id(loginScreen.LOGIN_SCREEN))).toBeVisible();
    
  });

  it('should navigate to the previous slide when prev button is clicked', async () => {
    await device.reloadReactNative();
    await element(by.id(welcomeScreen.SLIDES)).swipe('left');
    await element(by.id(welcomeScreen.PREV_BUTTON)).tap();
    await expect(element(by.id(welcomeScreen.WELCOME_TITLE))).toBeVisible();
  });

});