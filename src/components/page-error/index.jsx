import PropTypes from 'prop-types';

import './index.less';

function PageError(props) {
    const { errorInfo } = props;
    const { title, description } = errorInfo;

    return (
        <div className="page-error">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
        </div>
    );
}

PageError.propTypes = {
    errorInfo: PropTypes.object.isRequired,
};

export default PageError;
