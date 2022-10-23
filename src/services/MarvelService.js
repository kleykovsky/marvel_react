class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b8790f500f3709c8a59a43022523deb6'
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res  = await this.getResource(`${this._apiBase}characters?limit=9&offset=180&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        const notDesc = 'Sorry the description hasn\'t been added yet!'
        const amountDesc = char.description
        const MAX_LEN = 200;
        const newAmDesc = (amountDesc.length > MAX_LEN) ?
              amountDesc.substring(0, MAX_LEN) + '...' : amountDesc
        return {
            name: char.name,
            description: newAmDesc ? newAmDesc : notDesc,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[0].url,
        }
    }
}
export default MarvelService;
