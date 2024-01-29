interface Error {
    statusCode: number
}

function Error({ statusCode }: Error) {
    return (
        <h1>
            {statusCode
                ? `Ошибка, со статус кодом - ${statusCode}. Отправите скриншот с открытим консоль браузера, телеграмму - @web_hayk`
                : 'Ошибка. Отправите скриншот с открытим консоль браузера, телеграмму - @web_hayk'}
        </h1>
    )
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error