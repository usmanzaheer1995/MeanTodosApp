import { NewAppPage } from './app.po';

describe('new-app App', () => {
  let page: NewAppPage;

  beforeEach(() => {
    page = new NewAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
