import querystring from 'querystring'


const CLIENT_ID = '88b15df39dca48a7ba6bd2eb4909acaa'
const scope = ['user-read-currently-playing', 'user-top-read', 'user-read-recently-played', 'user-read-playback-state', 'user-read-currently-playing', 'user-library-read']

// const auth = `${CLIENT_ID}:${CLIENT_SECRET}`
// let token = null

const base64 = (auth) => {
  return Buffer.from(auth).toString('base64')
}

const authEndpoint = 'https://accounts.spotify.com/authorize';

// If there is no token, redirect to Spotify authorization
// if (!_token) {
//   window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
// }

const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const REDIRECT_URI = process.env.NODE_ENV === 'development' ? 'http://192.168.137.1:8080' : 'http://tones.vercel.app'

// export const getAccessToken = async () => {
//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       // 'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Basic ${base64(auth)}`,
//     },
//     body: querystring.stringify({
//       grant_type: 'refresh_token',
//       refresh_token
//     })
//   })
//   const data = await response.json()
//   // console.log(data)
//   // token = data.access_token
//   // if (token) return token
//   return data.access_token
// }

export const getTopTracks = async (token) => {
  // const token = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  const data = await response.json()

  // console.log({ data })

  return data
}

export const authorize = () => {
  return `${ AUTH_ENDPOINT }?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scope.join('%20')}`
}

export const getTopArtists = async (token) => {
  // const token = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  const data = await response.json()

  // console.log({ data })

  return data
}

export const getCurrentlyPlayingTrack = async (token) => {
  // const token = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  const data = await response.json()

  // console.log(data)

  return data
}

export const getRecentlyPlayed = async (token) => {
  // const token = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  const data = await response.json()

  // console.log(data)

  return data
}

export const getUserDetails = async (token) => {
  const response = await fetch('https://api.spotify.com/v1/me')
}