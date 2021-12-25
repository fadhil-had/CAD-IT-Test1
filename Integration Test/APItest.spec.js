describe('API Test', () => {
  it('Get All', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3300/allmovies',
    })
    .then((response) => {
        expect(response.status).to.eq(200)
    })
  })

  it('Get detail', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3300/movies/:movies'
      //:movies diganti dengan judul film
    })
    .then((response) => {
        expect(response.status).to.eq(200)
    })
  })

  it('Add New', () => {
    it('POST-Create user',()=>{
      var user = {
        "movies": "Test",
        "year": "-2021",
        "genre": "\nAction, Comedy, Crime",
        "rating": "6.9",
        "one_line": "\nJust test",
        "stars": "Siapa saja",
        "votes": "205,979",
        "runtime": "118",
        "gross": "$75.47M"
      }

      cy.request({
        method: 'POST',
        url: 'http://localhost:3300/add-movies',
        user
      }).then((response)=>{
        expect(response.status).equal(201)
        expect(response.body.movies).equal(user.movies)
        expect(response.body.year).equal(user.year)
        expect(response.body.genre).equal(user.genre)
        expect(response.body.rating).equal(user.rating)
        expect(response.body.one_line).equal(user.one_line)
        expect(response.body.stars).equal(user.stars)
        expect(response.body.votes).equal(user.votes)
        expect(response.body.runtime).equal(user.runtime)
        expect(response.body.gross).equal(user.gross)
      })

      cy.request('POST','http://localhost:3300/add-movies',user).its('body').should('include',{
        movies: "Test",
        year: "-2021",
        genre: "\nAction, Comedy, Crime",
        rating: "6.9",
        one_line: "\nJust test",
        stars: "Siapa saja",
        votes: "205,979",
        runtime: "118",
        gross: "$75.47M"
      })
    })
  })

  it('update Movie',()=>{
    var user1 = {
        "movies": "No Way Home",
        "year": "2022"
    }

    cy.request('PUT','http://localhost:3300/update-movies/:movies',user1 ).then((response)=>{
      // :movies can be changed
        expect(response.status).equal(200)
        expect(response.body.movies).equal(user1.movies)
        expect(response.body.year).equal(user1.year)
    })
  })

  it('Delete Movie',()=>{
    cy.request({
      method: 'GET',
      url: 'localhost:3300/delete-movies/:movies'
    })
    .then((response)=>{
      expect(response.status).equal(204)
    })
  })
})