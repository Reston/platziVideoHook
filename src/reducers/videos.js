import AsyncStorage from '@react-native-community/async-storage'

export const initSuggestions = async () => AsyncStorage.getItem('suggestions') || []
export const initCategories = async () => AsyncStorage.getItem('categories') || []

export const initialVideoState = {
  suggestions: [],
  categories: [],
  selectedMovie: null
}

export const videoReducer = (state, action) => {
  const updateCategories = async (payload) => AsyncStorage.setItem('categories', JSON.stringify(payload))
  const updateSuggestions = async (payload) => AsyncStorage.setItem('suggestions', JSON.stringify(payload))
  switch (action.type) {
    case 'SET_INIT_DATA':
      return {
        selectedMovie: null,
        categories: JSON.parse(action.payload.categories),
        suggestions: JSON.parse(action.payload.suggestions)
      }
    case 'SET_SUGGESTION_LIST':
      updateCategories(action.payload)
      return {
        ...state,
        suggestions: action.payload
      }
    case 'SET_CATEGORY_LIST':
      updateSuggestions(action.payload)
      return {
        ...state,
        categories: action.payload
      }
    case 'SET_SELECTED_MOVIE':
      return { ...state, selectedMovie: action.payload.movie }
    default:
      return state
  }
}

export { videoReducer as default }
