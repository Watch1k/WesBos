import Reset from '../components/Reset'

const ResetPage = ({ query: { resetToken } }) => (
  <div>
    <p>Reset <small>{resetToken}</small></p>
    <Reset resetToken={resetToken}/>
  </div>
)

export default ResetPage
