<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="./doc/nea_board.png" alt="Logo" height="auto" width=800>
  </a>

  <h3 align="center">  🛏️ Skip the Sleep Study! 🛏️ </h3>

  <p align="center">
    With Nea, we bring the sleep lab to <em>you</em>! 🥼
    <br />
    <!-- <a href="https://github.com/samlyme/hacktech">View Demo</a> -->
    <!-- &middot; -->
    <!-- <a href="https://github.com/samlyme/hacktech/issues/new?labels=bug&template=bug-report---.md">Report Bug</a> -->
    <!-- &middot; -->
    <!-- <a href="https://github.com/samlyme/hacktech/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>

<p align="center">
  <!-- Frontend -->
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />

  <!-- Backend -->
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Railway-000000?style=for-the-badge&logo=railway&logoColor=white" alt="Railway" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />

  <!-- ML / Data -->
  <img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" alt="Scikit-Learn" />
  <img src="https://img.shields.io/badge/Cuda+PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
  <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV" />
  <img src="https://img.shields.io/badge/PyEDFlib-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="PyEDFlib" />
</p>
<!-- ABOUT THE PROJECT -->

## About

### Inspiration

Despite their debilitating consequences, sleep apnea and other chronic sleep
disorders very frequently go undiagnosed due to the considerable inconvenience
and high cost of traditional sleep studies. ,With Nea, we provide a solution to
this problem that empowers individuals to monitor their sleep health from the
comfort of their own beds, using the devices they already own.

### What it does

Nea analyzes overnight sleep recordings to detect snoring patterns, breathing
abnormalities, and potential sleep apnea episodes. It provides detailed
insights, trends, and a professional PDF report for collaboration with
healthcare providers.

### Built With

<p align="center">

|                   | Technologies                                               |
| ----------------- | ---------------------------------------------------------- |
| **Frontend**      | React, TypeScript, Vite, Tailwind CSS, Radix UI, Shacdn/UI |
| **Backend**       | FastAPI, Railway VPS, PostgreSQL, SQLModel                 |
| **Deep Learning** | Scikit-Learn, PyTorch, OpenCV, YOLO, PyEDFlib              |

</p>

<!-- ROADMAP -->
## Challenges we ran into

- Converting video/audio files to normalized computer-readable formats
- Accounting for ambient noise in patient environment
- Converting RML into a text file and data frame for model training
- Implementing efficient data sampling and normalization for large audio datasets.
- Ensuring accurate detection of sleep events like snoring and breath obstructions.
- Handling file uploads and managing user account records efficiently.

## Accomplishments that we're proud of

- Successfully detecting and visualizing sleep events and possible episodes of
  sleep apnea with **{ THIS }%** accuracy.
- Creating a visually appealing and intuitive user interface.
- **ADD TWO MORE?**

## What we learned

- Backend is hard
- Reading documentation is hard
- File uploads are hard
- How to open/use a EDF/RML file
- How to use PyTorch
- How to do data analysis with Pandas
- How to convert video/audio files to csv and normalize the results

## What's next for Nea?

- Camera features (allow users to record full length videos and improve model to
  account for sleep movements)
- Expanding insights to include more sleep health metrics.
- Partnering with healthcare providers to offer a seamless path to professional
  diagnosis and treatment.
- Developing a mobile app for easier recording and analysis.

## Acknowledgments

- [Open Source White Noise](https://mc2method.org/white-noise/)
- [Sleep apnea: NHLBI sheds light on an underdiagnosed disorder](https://www.nhlbi.nih.gov/news/2017/sleep-apnea-nhlbi-sheds-light-underdiagnosed-disorder)
- [Undiagnosed and untreated sleep disorders: Barriers to care](https://aasm.org/undiagnosed-and-untreated-sleep-disorders-barriers-to-care/#:~:text=As%20a%20result%20of%20the,sleep%20disorder%20may%20go%20unnoticed.)
- [The Dangers of Uncontrolled Sleep Apnea](https://www.hopkinsmedicine.org/health/wellness-and-prevention/the-dangers-of-uncontrolled-sleep-apnea)
- [Sleep Apnea Tests and Diagnosis](https://www.webmd.com/sleep-disorders/sleep-apnea/diagnosing-sleep-apnea)
- [PSG-Audio, a scored polysomnography dataset with simultaneous audio recordings for sleep apnea studies](https://www.nature.com/articles/s41597-021-00977-w)
- [Detection of Sleep Apnea Using Wearable AI: Systematic Review and Meta-Analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC11422752/#table1)
- [Converting audio to .csv](https://github.com/n-crespo/mp4tocsv)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/samlyme/hacktech.svg?style=for-the-badge
[contributors-url]: https://github.com/samlyme/hacktech/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/samlyme/hacktech.svg?style=for-the-badge
[forks-url]: https://github.com/samlyme/hacktech/network/members
[stars-shield]: https://img.shields.io/github/stars/samlyme/hacktech.svg?style=for-the-badge
[stars-url]: https://github.com/samlyme/hacktech/stargazers
[issues-shield]: https://img.shields.io/github/issues/samlyme/hacktech.svg?style=for-the-badge
[issues-url]: https://github.com/samlyme/hacktech/issues
[license-shield]: https://img.shields.io/github/license/samlyme/hacktech.svg?style=for-the-badge
[license-url]: https://github.com/samlyme/hacktech/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
