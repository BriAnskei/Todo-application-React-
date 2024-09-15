interface ProgressProps {
  value: number;
}

export const Progress = ({ value }: ProgressProps) => {
  return (
    <>
      <div className="overall-container">
        <span>Overall Progress</span>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${value}%` }}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {Math.round(value)}%
          </div>
        </div>
      </div>
    </>
  );
};
