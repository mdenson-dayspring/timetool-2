import { UpdateSettingsAction } from './context.actions';
import { contextReducer, initialState } from './context.reducer';

describe('contextReducer', () => {
  it('should work', () => {
    const action: UpdateSettingsAction = new UpdateSettingsAction(initialState);
    const actual = contextReducer(initialState, action);
    expect(actual).toEqual(initialState);
  });
});
