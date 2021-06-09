import React, { useContext, useState } from 'react'
import axios from 'axios'

const DataContext = React.createContext()

export function useData() {
    return useContext(DataContext)
}

export function DataProvider({children}) {
    const [searchData, setSearchData] = useState([])
    const [serachDataError, setSearchDataError] = useState('')
    const [loadingSearchData, setLoadingSearchData] = useState(false)

    const [stockData, setStockData] = useState([])
    const [stockNewsData, setStockNewsData] = useState([])

    const [profileImage, setProfileImage] = useState(null)

    const [notesList, setNotesList] = useState([])

    async function fetchSearchData(query) {
        setLoadingSearchData(true)
        if (query.length === 0) return 
        await axios({
            method: 'get',
            url: 'http://localhost:4000/searchresults',
            params: {searchQuery: query}
        }).then(res => {
            if (res.data === 'Could not fetch data') {
                setSearchDataError('Could not fetch data')
            } else {
                setSearchData(res.data.articles)
            }
        })
        .catch(err => setSearchDataError('Could not fetch data'))
        console.log(searchData)
        setLoadingSearchData(false)
    }

    async function addStockSymbol(symbol){
        console.log(symbol)
        await axios({
            method: 'post',
            data: { symbol: symbol },
            withCredentials: true,
            url: 'http://localhost:4000/stock/addstock',
        })
        .then(res => {
            if(res.data === 'Could not add symbol to User Data') {
                const errorMessage = { code: 701, message: 'Could not add symbol'}
                throw errorMessage
            }
            else updateStockData()
        })
        .catch(err => console.log(err))
    }

    async function updateStockData(){
        console.log('Update stock data triggered')
        await axios({
            method: 'get',
            withCredentials: true, 
            url: 'http://localhost:4000/stock/list'
        })
        .then(res => {
            console.log(res)
            if (res.data === 'Cannot fetch stock list'){
                const errorMessage = { code: 702, message: 'Could not fetch stock list'}
                throw errorMessage
            }
            else {
                const symbols = res.data
                console.log(symbols)
                axios({
                    method: 'get',
                    params: { symbols: symbols },
                    withCredentials: true, 
                    url: 'http://localhost:4000/stock/data'
                })
                .then(res => {
                    if (res.data === 'Cannot fetch stock data'){
                        const errorMessage = { code: 703, message: 'Could not fetch stock data'}
                        throw errorMessage
                    } else setStockData(res.data)
                })
                .catch(err => { throw err })
            }
        })
        .catch(err => console.log(err))
    }

    async function removeStockSymbol(symbol) {
        console.log('Remove stock symbol triggered')
        await axios({
            method: 'delete',
            withCredentials: true,
            data: {symbol: symbol},
            url: 'http://localhost:4000/stock/removestock'
        })
        .then(async function (res){
            if (res.data === 'Cannot remove symbol from list'){
                const errorMessage = { code: 704, message: 'Could not remove symbol'}
                throw errorMessage
            }
            else updateStockData()
        })
        .catch(err => console.log(err))
    }

    async function fetchStockNews(){
        console.log('fetch Stock News triggered')
        await axios({
            method: 'get',
            withCredentials: true, 
            url: 'http://localhost:4000/stock/list'
        })
        .then(res => {
            console.log(res)
            if (res.data === 'Cannot fetch stock list'){
                const errorMessage = { code: 702, message: 'Could not fetch stock list'}
                throw errorMessage
            }
            else {
                const symbols = res.data
                console.log(symbols)
                axios({
                    method: 'get',
                    params: { symbols: symbols },
                    withCredentials: true, 
                    url: 'http://localhost:4000/news/stock'
                })
                .then(res => {
                    console.log(res)
                    if (res.data === 'Cannot fetch stock news'){
                        const errorMessage = { code: 706, message: 'Could not fetch stock news'}
                        throw errorMessage
                    } else setStockNewsData(res.data)
                })
                .catch(err => { throw err })
            }
        })
        .catch(err => console.log(err))
    }

    async function postUserImage(file){
        console.log('Post User image triggered')
        if (!file) return 
        let formData = new FormData()
        formData.append('file', file)
        axios.post('http://localhost:4000/userimage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        }).then(res => getUserImage())
        .catch(err => console.log(err))
    }

    async function getUserImage(){
        console.log('Get User image triggered')
        axios({
            method: 'get',
            withCredentials: true, 
            url: 'http://localhost:4000/userimage',
        })
        .then(res => {
            if (res.data === 'Cannot find user image') {
                const errorMessage = { code: 801, message: 'Cannot find user image'}
                throw errorMessage
            }
            else {
                let imageData = res.data.img
                const contentType = imageData.contentType
                const data = imageData.data.data
                const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data)))
                const src = `data:${contentType};base64,${base64String}`
                //console.log(src)
                setProfileImage(src)
            }
        })
        .catch(err => console.log(err))
    }

    async function fetchNotes(){
        await axios({
            method: 'get',
            withCredentials: true, 
            url: 'http://localhost:4000/notes'
        })
        .then(res => {
            if (res.data === 'Could not fetch user notes') return 
            else setNotesList(res.data)
        })
        .catch(err => console.log(err))
    }

    async function saveNotes(){
        console.log(notesList)
        await axios({
            method: 'post',
            withCredentials: true, 
            data: {notes: notesList },
            url: 'http://localhost:4000/notes',
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const value = {
        searchData,
        serachDataError,
        loadingSearchData,
        fetchSearchData,
        stockData,
        addStockSymbol,
        updateStockData,
        removeStockSymbol,
        stockNewsData, 
        fetchStockNews,
        profileImage,
        postUserImage,
        getUserImage,
        notesList,
        setNotesList,
        fetchNotes,
        saveNotes,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}