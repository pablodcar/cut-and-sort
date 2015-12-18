# cut-and-sort

Microservice for JSON formatting, giving a JSON list with entries, it cuts selected fields, sort them and present a pretty version to the user. It is implemented using https://webtask.io

## Use

The service receives a list of JSON objects in the body of an HTTP POST and multiple parameters to select fields (cut) and sort. the syntax for cut and sort support nested properties with dot notation.

## Example

An external system that returns minified JSONs with lot of fields sorted by a different criteria of what we need can be a candidate to be processed by this service.

### Original output of http://jsonplaceholder.typicode.com/users:

```javascript

[{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031 x56442","website":"hildegard.org","company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net","bs":"harness real-time e-markets"}},{"id":2,"name":"Ervin Howell","username":"Antonette","email":"Shanna@melissa.tv","address":{"street":"Victor Plains","suite":"Suite 879","city":"Wisokyburgh","zipcode":"90566-7771","geo":{"lat":"-43.9509","lng":"-34.4618"}},"phone":"010-692-6593 x09125","website":"anastasia.net","company":{"name":"Deckow-Crist","catchPhrase":"Proactive didactic contingency","bs":"synergize scalable supply-chains"}},{"id":3,"name":"Clementine Bauch","username":"Samantha","email":"Nathan@yesenia.net","address":{"street":"Douglas Extension","suite":"Suite 847","city":"McKenziehaven","zipcode":"59590-4157","geo":{"lat":"-68.6102","lng":"-47.0653"}},"phone":"1-463-123-4447","website":"ramiro.info","company":{"name":"Romaguera-Jacobson","catchPhrase":"Face to face bifurcated interface","bs":"e-enable strategic applications"}},{"id":4,"name":"Patricia Lebsack","username":"Karianne","email":"Julianne.OConner@kory.org","address":{"street":"Hoeger Mall","suite":"Apt. 692","city":"South Elvis","zipcode":"53919-4257","geo":{"lat":"29.4572","lng":"-164.2990"}},"phone":"493-170-9623 x156","website":"kale.biz","company":{"name":"Robel-Corkery","catchPhrase":"Multi-tiered zero tolerance productivity","bs":"transition cutting-edge web services"}}]
```

### Multiple query parameters to take only name, address.city & email

`cut=name&cut=address.city&cut=email`

### Multiple query parameters to sort 


`sort=address.city&sort=name`

## Puttings things together


`curl commands can be combined as shown:`

```shell
curl http://jsonplaceholder.typicode.com/users | curl -H "Content-Type: application/json" -XPOST -d @- "https://webtask.it.auth0.com/api/run/wt-pablodcar-gmail_com-0/cut-and-sort?webtask_no_cache=1&cut=name&cut=address.city&cut=email&sort=address.city"
```

### The output will be like:

```javascript
[
    {
        "name": "Nicholas Runolfsdottir V",
        "address.city": "Aliyaview",
        "email": "Sherwood@rosamond.me"
    },
    {
        "name": "Glenna Reichert",
        "address.city": "Bartholomebury",
        "email": "Chaim_McDermott@dana.io"
    },
    {
        "name": "Leanne Graham",
        "address.city": "Gwenborough",
        "email": "Sincere@april.biz"
    },
    ...
]

```
