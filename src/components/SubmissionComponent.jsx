import { useEffect } from 'react';
import styles from '../styles/Submission.module.css';

export default function SubmissionComponent({ status, input, output, type, expOut, consoleOutput }) {
  // status -> Pending | TimeLimitedExceded | RuntimeError | WrongAnswer | Accepted | Out of Memory
  const style = status.split(' ').join('');
  // const typeSubmission = type[0].toUpperCase().concat(type.substring(1));
  useEffect(() => {
    // console.log([status, input, output, expOut, consoleOutput])
    typeof (output)
  })
  return (
    <div className={styles.container}>
      <h2> Code Status: <span className={styles[style]}>{status}</span></h2>

      {status !== 'Pending' && !!output ? (
        <div className={styles.results}>
          {true ? (
            <div>
              <b>Input</b>
              <div className={styles.code}>{input.split('\n').map((str, i) => <p key={i}>{str}</p>)}</div>
            </div>
          ) : null}
          {true ? (
            <div>
              <b>Expected Output</b>
              <div className={styles.code}>{expOut.split('\n').map((str, i) => <p key={i}>{str}</p>)}</div>
            </div>
          ) : null}

          {status !== 'Compilation Error' ? (
            <div>
              <b>Your Answer</b>
              <div className={styles.code}>{(output).split('\n').map((str, i) => <p key={i}>{str}</p>)}</div>
            </div>
          ) : null}
          {consoleOutput ? (
            <div>
              <b>Console Output</b>
              <div className={styles.code} style={{ 'color': 'red' }}>{consoleOutput.split('\n').map((str, i) => <p key={i}>{str}</p>)}</div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
