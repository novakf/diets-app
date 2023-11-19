--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0 (Debian 15.0-1.pgdg110+1)
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(30) NOT NULL,
    password_hash character varying(100) NOT NULL,
    name character varying(30),
    age integer,
    height integer,
    weight integer
);


ALTER TABLE public.users OWNER TO root;

--
-- Name: auth_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_id_seq OWNER TO root;

--
-- Name: auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.auth_id_seq OWNED BY public.users.id;


--
-- Name: days; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.days (
    day_id integer NOT NULL,
    dish1_id integer,
    dish2_id integer,
    dish3_id integer,
    dish4_id integer,
    dish5_id integer
);


ALTER TABLE public.days OWNER TO root;

--
-- Name: days_day_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.days_day_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.days_day_id_seq OWNER TO root;

--
-- Name: days_day_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.days_day_id_seq OWNED BY public.days.day_id;


--
-- Name: diets; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.diets (
    diet_id integer NOT NULL,
    type character varying(100),
    day1_id integer,
    day2_id integer,
    day3_id integer
);


ALTER TABLE public.diets OWNER TO root;

--
-- Name: diets_diet_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.diets_diet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.diets_diet_id_seq OWNER TO root;

--
-- Name: diets_diet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.diets_diet_id_seq OWNED BY public.diets.diet_id;


--
-- Name: dishes; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.dishes (
    dish_id integer NOT NULL,
    dish_name character varying(30),
    category character varying(30),
    protein integer,
    fats integer,
    carbs integer,
    calories integer,
    photo character varying(100) DEFAULT 'https://drive.google.com/uc?export=view&id=1OyNn_HUo0Vz17MWhl7jM71_uLFIkgIcu'::character varying
);


ALTER TABLE public.dishes OWNER TO root;

--
-- Name: dishes_dish_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.dishes_dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dishes_dish_id_seq OWNER TO root;

--
-- Name: dishes_dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.dishes_dish_id_seq OWNED BY public.dishes.dish_id;


--
-- Name: product_dish; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.product_dish (
    id integer NOT NULL,
    product_id integer NOT NULL,
    dish_id integer NOT NULL
);


ALTER TABLE public.product_dish OWNER TO root;

--
-- Name: product_dish_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.product_dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_dish_id_seq OWNER TO root;

--
-- Name: product_dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.product_dish_id_seq OWNED BY public.product_dish.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name character varying(30),
    category character varying(30),
    price numeric,
    protein integer,
    fats integer,
    carbs integer
);


ALTER TABLE public.products OWNER TO root;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_product_id_seq OWNER TO root;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: stats; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.stats (
    stat_id integer NOT NULL,
    client_id integer,
    diet_id integer,
    start_date date
);


ALTER TABLE public.stats OWNER TO root;

--
-- Name: stats_stat_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.stats_stat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stats_stat_id_seq OWNER TO root;

--
-- Name: stats_stat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.stats_stat_id_seq OWNED BY public.stats.stat_id;


--
-- Name: days day_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days ALTER COLUMN day_id SET DEFAULT nextval('public.days_day_id_seq'::regclass);


--
-- Name: diets diet_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.diets ALTER COLUMN diet_id SET DEFAULT nextval('public.diets_diet_id_seq'::regclass);


--
-- Name: dishes dish_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.dishes ALTER COLUMN dish_id SET DEFAULT nextval('public.dishes_dish_id_seq'::regclass);


--
-- Name: product_dish id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_dish ALTER COLUMN id SET DEFAULT nextval('public.product_dish_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Name: stats stat_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.stats ALTER COLUMN stat_id SET DEFAULT nextval('public.stats_stat_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.auth_id_seq'::regclass);


--
-- Data for Name: days; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.days VALUES (1, 1, 2, 3, 4, 5);
INSERT INTO public.days VALUES (2, 6, 7, 8, 9, 10);
INSERT INTO public.days VALUES (3, 11, 12, 13, 1, 2);


--
-- Data for Name: diets; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.diets VALUES (1, 'Набор', 1, 2, 3);
INSERT INTO public.diets VALUES (2, 'Баланс', 3, 1, 2);
INSERT INTO public.diets VALUES (3, 'Снижение', 2, 1, 3);


--
-- Data for Name: dishes; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.dishes VALUES (38, 'Овсяная каша', 'Каши', 3, 10, 50, 200, '');
INSERT INTO public.dishes VALUES (2, 'Кюфта-кебаб с спагетти', 'Второе', 37, 15, 39, 435, 'https://api.crm.p-group.ru/upload/images/1663754781360b0c7071e30e057a24840ff55af876554.jpg');
INSERT INTO public.dishes VALUES (3, 'Ячневая каша с черничным варен', 'Каши', 10, 3, 76, 370, 'https://api.crm.p-group.ru/upload/images/11694.png');
INSERT INTO public.dishes VALUES (5, 'Птица с ветчиной и пастой', 'Второе', 37, 17, 40, 459, 'https://api.crm.p-group.ru/upload/images/1663237755989aa90133a41e98ddf20fb423bbfbddee6.jpg');
INSERT INTO public.dishes VALUES (4, 'Рис с цыпленком', 'Второе', 29, 11, 34, 350, 'https://api.crm.p-group.ru/upload/images/166323775421784317571b72b68485785aca329ea98b4.jpg');
INSERT INTO public.dishes VALUES (6, 'Бифштекс с пюре из нута', 'Второе', 26, 14, 24, 324, 'https://api.crm.p-group.ru/upload/images/1669643986098ad7591aa260a4fe13f50db4c487e5452.jpg');
INSERT INTO public.dishes VALUES (8, 'Люля из говядины с Барли', 'Второе', 30, 11, 56, 438, 'https://api.crm.p-group.ru/upload/images/1669643991860925e7da6f3398a7664fbba342e43930b.jpg');
INSERT INTO public.dishes VALUES (13, 'Салат свекольный с орехами', 'Салаты', 4, 6, 23, 161, 'https://api.crm.p-group.ru/upload/images/1391.png');
INSERT INTO public.dishes VALUES (1, 'Гречневая каша на молоке', 'Каши', 6, 4, 28, 176, 'https://api.crm.p-group.ru/upload/images/2511.png');
INSERT INTO public.dishes VALUES (11, 'Салат Цезарь', 'Салаты', 17, 6, 4, 132, 'https://api.crm.p-group.ru/upload/images/12930.png');
INSERT INTO public.dishes VALUES (7, 'Наггетсы и соба', 'Второе', 27, 13, 56, 446, 'https://api.crm.p-group.ru/upload/images/1669643989490f1cf73dcb32845543d98c4b4d95698e8.jpg');
INSERT INTO public.dishes VALUES (12, 'Поке с красной рыбой', 'Салаты', 5, 15, 21, 241, 'https://api.crm.p-group.ru/upload/images/16696359613557fb8e7bf5457040b30bc09cf8ebc9b18.png');
INSERT INTO public.dishes VALUES (10, 'Кукурузная каша', 'Каши', 7, 3, 38, 209, 'https://api.crm.p-group.ru/upload/images/10668.png');
INSERT INTO public.dishes VALUES (9, 'Оладьи из индейки с гречкой', 'Второе', 27, 17, 67, 524, 'https://api.crm.p-group.ru/upload/images/1669643992083988b0aa1d53d6355c9999f87594f3885.jpg');


--
-- Data for Name: product_dish; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.product_dish VALUES (7, 5, 4);
INSERT INTO public.product_dish VALUES (6, 22, 3);
INSERT INTO public.product_dish VALUES (1, 4, 1);
INSERT INTO public.product_dish VALUES (10, 1, 5);
INSERT INTO public.product_dish VALUES (20, 29, 10);
INSERT INTO public.product_dish VALUES (8, 2, 4);
INSERT INTO public.product_dish VALUES (9, 2, 5);
INSERT INTO public.product_dish VALUES (17, 27, 8);
INSERT INTO public.product_dish VALUES (19, 4, 9);
INSERT INTO public.product_dish VALUES (13, 25, 6);
INSERT INTO public.product_dish VALUES (18, 28, 9);
INSERT INTO public.product_dish VALUES (16, 24, 8);
INSERT INTO public.product_dish VALUES (12, 24, 6);
INSERT INTO public.product_dish VALUES (11, 23, 5);
INSERT INTO public.product_dish VALUES (5, 21, 3);
INSERT INTO public.product_dish VALUES (4, 1, 2);
INSERT INTO public.product_dish VALUES (14, 2, 7);
INSERT INTO public.product_dish VALUES (15, 26, 7);
INSERT INTO public.product_dish VALUES (3, 20, 2);
INSERT INTO public.product_dish VALUES (2, 10, 1);
INSERT INTO public.product_dish VALUES (21, 12, 11);
INSERT INTO public.product_dish VALUES (22, 2, 11);
INSERT INTO public.product_dish VALUES (23, 11, 11);
INSERT INTO public.product_dish VALUES (24, 30, 12);
INSERT INTO public.product_dish VALUES (25, 5, 12);
INSERT INTO public.product_dish VALUES (26, 31, 12);
INSERT INTO public.product_dish VALUES (27, 31, 13);
INSERT INTO public.product_dish VALUES (59, 18, 38);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.products VALUES (2, 'Курица', 'Мясо', 80, 20, 5, 7);
INSERT INTO public.products VALUES (3, 'Клюква', 'Ягоды', 30, 0, 0, 10);
INSERT INTO public.products VALUES (5, 'Рис', 'Каши', 50, 6, 6, 50);
INSERT INTO public.products VALUES (6, 'Свинина', 'Мясо', 90, 18, 10, 25);
INSERT INTO public.products VALUES (7, 'Яйцо Куриное', 'Яйца', 30, 7, 4, 50);
INSERT INTO public.products VALUES (8, 'Чай', 'Напитки', 20, 0, 0, 3);
INSERT INTO public.products VALUES (9, 'Апельсин', 'Фрукты', 40, 0, 0, 5);
INSERT INTO public.products VALUES (11, 'Огурцы', 'Овощи', 30, 0, 0, 12);
INSERT INTO public.products VALUES (12, 'Помидоры', 'Овощи', 30, 0, 0, 13);
INSERT INTO public.products VALUES (13, 'Морковь', 'Овощи', 30, 0, 0, 10);
INSERT INTO public.products VALUES (14, 'Картофель', 'Овощи', 50, 5, 10, 40);
INSERT INTO public.products VALUES (15, 'Вермишель', 'Мучное', 50, 6, 4, 50);
INSERT INTO public.products VALUES (16, 'Капуста', 'Овощи', 30, 0, 0, 3);
INSERT INTO public.products VALUES (17, 'Котлета', 'Мясо', 95, 18, 10, 80);
INSERT INTO public.products VALUES (18, 'Овсянка', 'Каши', 20, 4, 3, 50);
INSERT INTO public.products VALUES (19, 'Вишня', 'Ягоды', 40, 0, 0, 5);
INSERT INTO public.products VALUES (20, 'Кебаб', 'Мясо', 100, 10, 10, 50);
INSERT INTO public.products VALUES (1, 'Спагетти', 'Мучное', 40, 8, 3, 30);
INSERT INTO public.products VALUES (27, 'Барли', 'Каши', 40, 0, 0, 0);
INSERT INTO public.products VALUES (24, 'Говядина', 'Мясо', 100, 0, 0, 0);
INSERT INTO public.products VALUES (30, 'Рыба', 'Мясо', 180, 0, 0, 0);
INSERT INTO public.products VALUES (31, 'Свекла', 'Овощи', 50, 0, 0, 0);
INSERT INTO public.products VALUES (28, 'Индейка', 'Мясо', 120, 0, 0, 0);
INSERT INTO public.products VALUES (25, 'Нут', 'Овощи', 50, 0, 0, 0);
INSERT INTO public.products VALUES (21, 'Ячневая каша', 'Каши', 40, 7, 0, 0);
INSERT INTO public.products VALUES (29, 'Кукуруза', 'Овощи', 50, 0, 0, 0);
INSERT INTO public.products VALUES (23, 'Ветчина', 'Колбасы', 100, 0, 0, 0);
INSERT INTO public.products VALUES (22, 'Черника', 'Ягоды', 100, 0, 0, 0);
INSERT INTO public.products VALUES (26, 'Соба', 'Каши', 40, 0, 0, 0);
INSERT INTO public.products VALUES (10, 'Молоко', 'Кисломолочные', 60, 5, 7, 20);
INSERT INTO public.products VALUES (4, 'Гречка', 'Каши', 40, 10, 4, 40);
INSERT INTO public.products VALUES (41, 'макароны', 'мучное', 1, 2, 0, 0);
INSERT INTO public.products VALUES (42, 'Сыр', 'Молочные', 100, 1, 1, 4);


--
-- Data for Name: stats; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.users VALUES (23, 'admin', '$2b$10$l61/cHwodSeo5znps/C.2eB56VxS41YAGFn9qsFcGMV.U9tZNTI.i', 'admin', 20, 190, 90);


--
-- Name: auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.auth_id_seq', 22, true);


--
-- Name: days_day_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.days_day_id_seq', 1, false);


--
-- Name: diets_diet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.diets_diet_id_seq', 1, false);


--
-- Name: dishes_dish_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.dishes_dish_id_seq', 38, true);


--
-- Name: product_dish_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.product_dish_id_seq', 60, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.products_product_id_seq', 32, true);


--
-- Name: stats_stat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.stats_stat_id_seq', 163, true);


--
-- Name: users auth_login_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT auth_login_key UNIQUE (login);


--
-- Name: users auth_password_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT auth_password_key UNIQUE (password_hash);


--
-- Name: users auth_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT auth_pkey PRIMARY KEY (id);


--
-- Name: days days_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY (day_id);


--
-- Name: diets diets_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.diets
    ADD CONSTRAINT diets_pkey PRIMARY KEY (diet_id);


--
-- Name: dishes dishes_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_pkey PRIMARY KEY (dish_id);


--
-- Name: product_dish product_dish_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_dish
    ADD CONSTRAINT product_dish_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: stats stats_client_id_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_client_id_key UNIQUE (client_id);


--
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (stat_id);


--
-- Name: days days_dish1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_dish1_id_fkey FOREIGN KEY (dish1_id) REFERENCES public.dishes(dish_id);


--
-- Name: days days_dish2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_dish2_id_fkey FOREIGN KEY (dish2_id) REFERENCES public.dishes(dish_id);


--
-- Name: days days_dish3_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_dish3_id_fkey FOREIGN KEY (dish3_id) REFERENCES public.dishes(dish_id);


--
-- Name: days days_dish4_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_dish4_id_fkey FOREIGN KEY (dish4_id) REFERENCES public.dishes(dish_id);


--
-- Name: days days_dish5_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_dish5_id_fkey FOREIGN KEY (dish5_id) REFERENCES public.dishes(dish_id);


--
-- Name: diets diets_day1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.diets
    ADD CONSTRAINT diets_day1_id_fkey FOREIGN KEY (day1_id) REFERENCES public.days(day_id);


--
-- Name: diets diets_day2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.diets
    ADD CONSTRAINT diets_day2_id_fkey FOREIGN KEY (day2_id) REFERENCES public.days(day_id);


--
-- Name: diets diets_day3_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.diets
    ADD CONSTRAINT diets_day3_id_fkey FOREIGN KEY (day3_id) REFERENCES public.days(day_id);


--
-- Name: product_dish product_dish_dish_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_dish
    ADD CONSTRAINT product_dish_dish_id_fkey FOREIGN KEY (dish_id) REFERENCES public.dishes(dish_id);


--
-- Name: product_dish product_dish_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_dish
    ADD CONSTRAINT product_dish_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: stats stats_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- Name: stats stats_diet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES public.diets(diet_id);


--
-- PostgreSQL database dump complete
--

