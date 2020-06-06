import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails'
import { Creators as PlayerActions } from '../../store/ducks/player'

import Loading from '../../components/Loading'

import { Container, Header, SongList, SongItem } from './styles'
import ClockIcon from '../../assets/images/clock.svg'
import PlusIcon from '../../assets/images/plus.svg'

class Playlist extends React.Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string,
            }),
        }).isRequired,
        getPlaylistDetailsRequest: PropTypes.func.isRequired,
        playlistDetails: PropTypes.shape({
            data: PropTypes.shape({
                thumbnail: PropTypes.string,
                title: PropTypes.string,
                description: PropTypes.string,
                songs: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        title: PropTypes.string,
                        author: PropTypes.string,
                        album: PropTypes.string,
                    }),
                ),
            }),
            loading: PropTypes.bool,
        }).isRequired,
        loadSong: PropTypes.func.isRequired,
        currenSong: PropTypes.shape({
            id: PropTypes.number,
        }).isRequired,
    }

    state = {
        selectedSong: null,
    }
    componentDidMount() {
        this.loadPlaylistDetails()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadPlaylistDetails()
        }
    }

    loadPlaylistDetails = () => {
        const { match, getPlaylistDetailsRequest } = this.props
        const { id } = match.params

        getPlaylistDetailsRequest(id)
    }

    renderDetails = () => {
        const { selectedSong } = this.state
        const {
            currentSong,
            playlistDetails: { data },
            loadSong,
        } = this.props
        return (
            <Container>
                <Header>
                    <img src={data.thumbnail} alt={data.title} />

                    <div>
                        <span>Playlist</span>
                        <h1>{data.title}</h1>
                        {!!data.song && <p>{data.songs.length} músicas</p>}
                        <button>Play</button>
                    </div>
                </Header>
                <SongList cellPadding={0} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th />
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>
                                <img src={ClockIcon} alt="Duration" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!data.songs ? (
                            <tr>
                                <td colSpan={5}> Any music found</td>
                            </tr>
                        ) : (
                            data.songs.map(song => (
                                <SongItem
                                    key={song.id}
                                    onClick={() => this.setState({ selectedSong: song.id })}
                                    onDoubleClick={() => loadSong(song, data.songs)}
                                    selected={selectedSong === song.id}
                                    playing={currentSong && currentSong.id === song.id}
                                >
                                    <td>
                                        <img src={PlusIcon} alt="Add" />
                                    </td>
                                    <td>{song.title}</td>
                                    <td>{song.author}</td>
                                    <td> {song.album}</td>
                                    <td>3:20</td>
                                </SongItem>
                            ))
                        )}
                    </tbody>
                </SongList>
            </Container>
        )
    }

    render() {
        const { playlistDetails } = this.props
        return (
            <>
                {playlistDetails.loading ? (
                    <Container loading>
                        <Loading />
                    </Container>
                ) : (
                    this.renderDetails()
                )}
            </>
        )
    }
}

const mapStateToProps = state => ({
    currentSong: state.player.currentSong,
    playlistDetails: state.playlistDetails,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Playlist)
