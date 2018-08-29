import { AppPage } from './app.po';
import { HM } from '@timetool/utils/time-model';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    const expected = HM.Now();
    expect(page.getParagraphText()).toEqual(expected.toString());
  });
});
