import React, {useEffect} from 'react'

import Aos from 'aos'
import 'aos/dist/aos.css'

const questions = [
    {
        ques: "Can I see One Plus in action before purchasing?",
        ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        ques: "Do you have a free trial?",
        ans: "Tempus imperdiet nulla malesuada pellentesque elit eget gravida. Scelerisque varius morbi enim nunc faucibus a pellentesque sit."
    },
    {
        ques: "What are the requirements for using One Plus?",
        ans: "Tellus elementum sagittis vitae et leo duis. Sed egestas egestas fringilla phasellus. Tortor consequat id porta nibh venenatis cras sed felis eget."
    },
    {
        ques: "How does One Plus handle my privacy?",
        ans: "Egestas purus viverra accumsan in nisl nisi scelerisque. Nunc pulvinar sapien et ligula ullamcorper malesuada proin."
    }
]

const FAQ = () => {

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])

  return (
    <div id='faq' className="faq container gridC">
        <span className='hd'>FREQUENTLY ASKED QUESTIONS</span>
        <h2 className='h2'>Everything you need to know before getting started</h2>

        <div data-aos='fade-up' data-aos-duration='2500' className="qa gridC">
            {
                questions.map(({ques, ans})=>{
                    return (
                        <div className="singleQues">
                            <span>{ques}</span>
                            <p>{ans}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default FAQ