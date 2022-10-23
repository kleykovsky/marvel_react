import {Component} from "react";
import marvelService from "../../services/MarvelService";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class RandomChar extends Component{

    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar();
        // this.timerid = setInterval(this.updateChar, 3000)
    }


    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    updateChar = () => {
        const _MAX_ID = 1011400,
              _MIN_ID = 1011000;
        const id = Math.floor(Math.random() * (_MAX_ID - _MIN_ID) + _MIN_ID - 130);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {

        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null

        // if(loading) {
        //     return <Spinner/>
        // }

        return (
            <div className="randomchar">
                {errorMessage} {spinner} {content}
                {/*{loading ? <Spinner/> : <View char={char}/>}*/}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                             onClick={this.updateChar}
                        >Try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char
    let className = 'randomchar__img';
    const newThumbnail = thumbnail.slice(-1 -12)
    newThumbnail === "available.jpg" ? className += ' randomchar__img_contain'
                                     : className = 'randomchar__img';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={className}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;