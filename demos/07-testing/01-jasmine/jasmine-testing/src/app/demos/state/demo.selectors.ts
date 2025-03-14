import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DemoState, demosFeatureKey, demosAdapter } from './demos.reducer';

export const getDemoState = createFeatureSelector<DemoState>(demosFeatureKey);

export const getFilter = createSelector(
  getDemoState,
  (state: DemoState) => state.filter
);

export const getSelected = createSelector(
  getDemoState,
  (state: DemoState) => state.selected
);

// Note: Default Selectors provided by Entity
export const { selectAll, selectEntities, selectIds, selectTotal } =
  demosAdapter.getSelectors();

export const getAllDemos = createSelector(getDemoState, selectAll);

export const getVisibleDemos = createSelector(getDemoState, (state) =>
  selectAll(state).filter((item) => item.visible)
);