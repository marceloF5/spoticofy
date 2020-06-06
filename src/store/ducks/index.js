import { combineReducers } from 'redux'

import error from './error'
import player from './player'
import playlists from './playlists'
import playlistDetails from './playlistDetails'

export default combineReducers({
    error,
    player,
    playlists,
    playlistDetails,
})
