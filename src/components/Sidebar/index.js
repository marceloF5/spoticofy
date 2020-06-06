import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { Creators as PlaylistsActions } from '../../store/ducks/playlists'

import Loading from '../Loading'

import { Container, NewPlaylist, Nav } from './styles'
import AddPlaylistIcon from '../../assets/images/add_playlist.svg'

class Sidebar extends React.Component {
    static propTypes = {
        getPlaylistsRequest: PropTypes.func.isRequired,
        playlists: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string,
                }),
            ),
            loading: PropTypes.bool,
        }).isRequired,
    }
    componentDidMount() {
        const { getPlaylistsRequest } = this.props
        getPlaylistsRequest()
    }

    render() {
        const { playlists } = this.props
        return (
            <Container>
                <div>
                    <Nav main>
                        <li>
                            <Link to={'/'}>Navigate</Link>
                        </li>
                        <li>
                            <Link>Radio</Link>
                        </li>
                    </Nav>
                    <Nav>
                        <li>
                            <span>YOUR LIBRARY</span>
                        </li>
                        <li>
                            <Link to={'/'}>Your Daily Mix</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Played recently</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Musics</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Album</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Artists</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Stations</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Local Files</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Videos</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Postcasts</Link>
                        </li>
                    </Nav>
                    <Nav>
                        <li>
                            <span>Playlists</span>
                            {playlists.loading && <Loading />}
                        </li>
                        {playlists.data.map(playlist => (
                            <li key={playlist.id}>
                                <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
                            </li>
                        ))}
                    </Nav>
                </div>
                <NewPlaylist>
                    <img src={AddPlaylistIcon} alt="Add playlist" />
                    New playlist
                </NewPlaylist>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    playlists: state.playlists,
})

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidebar)
