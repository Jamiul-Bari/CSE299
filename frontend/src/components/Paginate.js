import React from 'react';
import { Pagination, Paginator } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    if (keyword) {
        keyword = keyword.split('?keyword')[1].split('&')[0];
    }

    return (
        pages > 1 && (
            <Paginator>
                {[...Array(pages).keys()].map((a_page) => (
                    <LinkContainer
                        key={a_page + 1}
                        to={`/?keyword=${keyword}&page=${a_page + 1}`}
                    >
                        <Pagination.Item
                            active={a_page + 1 === page}
                        >
                            {a_page + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Paginator>
        )
    )
}

export default Paginate
