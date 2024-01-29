import {useTypedSelector} from "@store/selectors/config";

export const useMainSelector = () => useTypedSelector(state => state.main);
export const useChatSelector = () => useTypedSelector(state => state.chat);
export const useNewsSelector = () => useTypedSelector(state => state.news);
export const useVideoObservingSelector = () => useTypedSelector(state => state.videoObserving);
export const useMetersSelector = () => useTypedSelector(state => state.meters);
export const useTasksSelector = () => useTypedSelector(state => state.tasks);
export const usePollsSelector = () => useTypedSelector(state => state.polls);
export const useOrganizationsSelector = () => useTypedSelector(state => state.organizations);
export const useHousesMapSelector = () => useTypedSelector(state => state.housesMap);
export const useDesktopSelector = () => useTypedSelector(state => state.desktop);
export const useDocumentsSelector = () => useTypedSelector(state => state.documents);