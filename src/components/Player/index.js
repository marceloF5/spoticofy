import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as PlayerActions } from '../../store/ducks/player'

import {
    Container, Current, Progress, Controls, Time, ProgressSlider, Volume,
} from './styles'
import VolumeIcon from '../../assets/images/volume.svg'
import ShuffleIcon from '../../assets/images/shuffle.svg'
import BackwardIcon from '../../assets/images/backward.svg'
import PlayIcon from '../../assets/images/play.svg'
import PauseIcon from '../../assets/images/pause.svg'
import ForwardIcon from '../../assets/images/forward.svg'
import RepeatIcon from '../../assets/images/repeat.svg'

const Player = ({
    player,
    play,
    pause,
    prev,
    next,
    playing,
    position,
    positionShow,
    duration,
    handlePosition,
    setPosition,
    progress,
    setVolume,
}) => (
    <Container>
        {!!player.currentSong && (
            <Sound
                url={player.currentSong.file}
                playStatus={player.status}
                onFinishedPlaying={next}
                onPlaying={playing}
                position={player.position}
                volume={player.volume}
            />
        )}

        <Current>
            {!!player.currentSong && (
                <React.Fragment>
                    <img src={player.currentSong.thumbnail} alt={player.currentSong.title} />
                    <div>
                        <span>{player.currentSong.title}</span>
                        <small>{player.currentSong.author}</small>
                    </div>
                </React.Fragment>
            )}
        </Current>
        <Progress>
            <Controls>
                <button>
                    <img src={ShuffleIcon} alt="Shuffle" />
                </button>
                <button onClick={prev}>
                    <img src={BackwardIcon} alt="Backward" />
                </button>
                {!!player.currentSong && player.status === Sound.status.PLAYING ? (
                    <button onClick={pause}>
                        <img src={PauseIcon} alt="Pause" />
                    </button>
                ) : (
                    <button onClick={play}>
                        <img src={PlayIcon} alt="Play" />
                    </button>
                )}
                <button onClick={next}>
                    <img src={ForwardIcon} alt="Forward" />
                </button>
                <button>
                    <img src={RepeatIcon} alt="Repeat" />
                </button>
            </Controls>
            <Time>
                <span>{positionShow || position}</span>
                <ProgressSlider>
                    <Slider
                        railStyle={{ background: '#404040', borderRadius: 10 }}
                        trackStyle={{ background: '#1ed760' }}
                        handleStyle={{ border: 0 }}
                        max={1000}
                        onChange={value => handlePosition(value / 1000)}
                        onAfterChange={value => setPosition(value / 1000)}
                        value={progress}
                    />
                </ProgressSlider>
                <span>{duration}</span>
            </Time>
        </Progress>
        <Volume>
            <img src={VolumeIcon} alt="Volume" />
            <Slider
                railStyle={{ background: '#404040', borderRadius: 10 }}
                trackStyle={{ background: '#FFF' }}
                handleStyle={{ display: 'none' }}
                onChange={setVolume}
                value={player.volume}
            />
        </Volume>
    </Container>
)

Player.propTypes = {
    player: PropTypes.shape({
        currentSong: PropTypes.shape({
            file: PropTypes.string,
            title: PropTypes.string,
            author: PropTypes.string,
            thumbnail: PropTypes.string,
        }).isRequired,
        status: PropTypes.string,
    }),
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    playing: PropTypes.func.isRequired,
    position: PropTypes.string.isRequired,
    positionShow: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    handlePosition: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
}

function msToTime(duration) {
    if (!duration) return null
    let seconds = parseInt((duration / 1000) % 60, 10)
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10)

    seconds = seconds < 10 ? `0${seconds}` : seconds

    return `${minutes}:${seconds}`
}

const mapStateToProps = state => ({
    player: state.player,
    position: msToTime(state.player.position),
    duration: msToTime(state.player.duration),
    positionShow: msToTime(state.player.positionShow),
    progress: (state.player.positionShow || state.player.position) * (1000 / state.player.duration),
})

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Player)
