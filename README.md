<!-- ABOUT THE PROJECT -->
## About Secure Text Transfer

Secure Text Transfer (STT) is a website project enabling people to transfer a piece of text (e.g. a password, URL, text snippet) conveniently and securely from one device to another. Design goals:

  * no registration or login needed
  * minimal amount of cognitive load
  * minimal amount of typing and clicks without sacrifing security
  * responsive design, wide device support

[![STT Screenshot](https://github.com/sasuw/secure-text-transfer-backend/blob/master/images/stt-fronpage-screenshot-2020-08-30.png?raw=true)](https://stt.sasu.net)

### History

I started this project in 2020, because over the years I often had the need to quickly copy a password from one device to another. As secure passwords are quite long nowadays and the amount of typing can be quite frustrating, I thought there should be a way to copy a text string from one trusted device to another securely. As I did not find any ready-made solution fitting my needs, I decided to make it myself.

### Security

Currently the text is transferred from the sending device to the server, stored in working memory for a maximum time of 5 minutes or until it is retrieved and then deleted. It is not written anywhere permanently, whether in a database nor is it logged anywhere. Transport security is guaranteed by using HTTPS.

In the future the text to be transferred is encrypted on the client side, further increasing the security.

### Project structure

The project has a backend, see [secure-text-transfer-backend](https://github.com/sasuw/secure-text-transfer-backend). 

This project is the frontend part, which is a static website. The frontend interacts with the backend through REST endpoints using AJAX.

### Built With

* [Skeleton](http://getskeleton.com/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To run the frontend locally you need a simple HTTP server to server the pages locally. If you want to interact with the backend, you should run the backend locally. See [https://github.com/sasuw/secure-text-transfer-backend](https://github.com/sasuw/secure-text-transfer-backend)

### Run

If you have Python 3 installed on your machine, just go to the dist directory under root of this project and run

    python -m http.server 8080

and open your browser at http://localhost:8080

### Building

As this is a multi-lingual website built with [qutem](https://github.com/sasuw/qutem), you have to apply the templates before seeing the changes. The easiest way to do that is to run the script

    ./build/createDist.sh

The sitemap for this website is create with [camilla](https://github.com/sasuw/camilla).

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/sasuw/secure-text-transfer-frontend/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

You can contribute to this project in many ways:

  * submitting an issue (bug or enhancement proposal) 
  * testing
  * contributing code

If you want to contribute code, please open an issue or contact me beforehand to ensure that your work in line with the project goals.

When you decide to commit some code:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Sasu Welling - [@sasuw](https://twitter.com/sasuw) -  
Project Link: [https://github.com/sasuw/secure-text-transfer-frontend](https://github.com/sasuw/secure-text-transfer-frontend)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Skeleton](http://getskeleton.com/)