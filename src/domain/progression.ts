export type ProgressState = {
  status: 'welcome' | 'playing' | 'completed';
  stepIndex: number;
  stars: number;
  completedIds: string[];
  totalSteps: number;
};

export type ProgressAction =
  | { type: 'start' }
  | { type: 'answer'; itemId: string; stars: number }
  | { type: 'next' }
  | { type: 'restart' };

export const initialProgress = (totalSteps: number): ProgressState => ({
  status: 'welcome',
  stepIndex: 0,
  stars: 0,
  completedIds: [],
  totalSteps,
});

export function reduceProgress(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'start':
      return { ...initialProgress(state.totalSteps), status: 'playing' };
    case 'answer':
      if (state.completedIds.includes(action.itemId)) return state;
      return {
        ...state,
        stars: state.stars + Math.max(0, action.stars),
        completedIds: [...state.completedIds, action.itemId],
      };
    case 'next':
      if (state.stepIndex >= state.totalSteps - 1) return { ...state, status: 'completed' };
      return { ...state, stepIndex: state.stepIndex + 1 };
    case 'restart':
      return initialProgress(state.totalSteps);
  }
}
