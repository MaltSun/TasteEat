PGDMP                          |            TasteEat    15.7    15.7 H    Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    16398    TasteEat    DATABASE        CREATE DATABASE "TasteEat" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Belarus.1251';
    DROP DATABASE "TasteEat";
                postgres    false            W           1247    24586    enum_Customer_role    TYPE     M   CREATE TYPE public."enum_Customer_role" AS ENUM (
    'user',
    'admin'
);
 '   DROP TYPE public."enum_Customer_role";
       public          postgres    false            Z           1247    24614    enum_Order_status    TYPE     c   CREATE TYPE public."enum_Order_status" AS ENUM (
    'pending',
    'completed',
    'canceled'
);
 &   DROP TYPE public."enum_Order_status";
       public          postgres    false            �            1259    24794    Cart    TABLE     �   CREATE TABLE public."Cart" (
    "customerId" integer NOT NULL,
    "dishId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    quantity integer
);
    DROP TABLE public."Cart";
       public         heap    postgres    false            �            1259    24748    Customer    TABLE     �  CREATE TABLE public."Customer" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role public."enum_Customer_role" NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "profilePicture" character varying(255)
);
    DROP TABLE public."Customer";
       public         heap    postgres    false    855            �            1259    24747    Customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Customer_id_seq";
       public          postgres    false    220            ]           0    0    Customer_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;
          public          postgres    false    219            �            1259    24759 
   Deliverers    TABLE     +  CREATE TABLE public."Deliverers" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Deliverers";
       public         heap    postgres    false            �            1259    24758    Deliverers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Deliverers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Deliverers_id_seq";
       public          postgres    false    222            ^           0    0    Deliverers_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Deliverers_id_seq" OWNED BY public."Deliverers".id;
          public          postgres    false    221            �            1259    24739    Dish    TABLE     w  CREATE TABLE public."Dish" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price double precision NOT NULL,
    category character varying(255) NOT NULL,
    photo character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Dish";
       public         heap    postgres    false            �            1259    24738    Dish_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Dish_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Dish_id_seq";
       public          postgres    false    218            _           0    0    Dish_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Dish_id_seq" OWNED BY public."Dish".id;
          public          postgres    false    217            �            1259    24770    Order    TABLE     J  CREATE TABLE public."Order" (
    id integer NOT NULL,
    address character varying(255) NOT NULL,
    coment text,
    "customerId" integer NOT NULL,
    status public."enum_Order_status" NOT NULL,
    "deliveryId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Order";
       public         heap    postgres    false    858            �            1259    24825 	   OrderDish    TABLE       CREATE TABLE public."OrderDish" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "dishId" integer NOT NULL,
    quantity integer DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."OrderDish";
       public         heap    postgres    false            �            1259    24824    OrderDish_id_seq    SEQUENCE     �   CREATE SEQUENCE public."OrderDish_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."OrderDish_id_seq";
       public          postgres    false    229            `           0    0    OrderDish_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."OrderDish_id_seq" OWNED BY public."OrderDish".id;
          public          postgres    false    228            �            1259    24769    Order_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Order_id_seq";
       public          postgres    false    224            a           0    0    Order_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;
          public          postgres    false    223            �            1259    24811    Review    TABLE     �   CREATE TABLE public."Review" (
    id integer NOT NULL,
    coment text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "customerId" integer
);
    DROP TABLE public."Review";
       public         heap    postgres    false            �            1259    24810    Review_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Review_id_seq";
       public          postgres    false    227            b           0    0    Review_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;
          public          postgres    false    226            �            1259    16399    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    24727    User    TABLE     .  CREATE TABLE public."User" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character(255) NOT NULL,
    password character varying(255) NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    24726    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    216            c           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    215            �           2604    24751    Customer id    DEFAULT     n   ALTER TABLE ONLY public."Customer" ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);
 <   ALTER TABLE public."Customer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    24762    Deliverers id    DEFAULT     r   ALTER TABLE ONLY public."Deliverers" ALTER COLUMN id SET DEFAULT nextval('public."Deliverers_id_seq"'::regclass);
 >   ALTER TABLE public."Deliverers" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    24742    Dish id    DEFAULT     f   ALTER TABLE ONLY public."Dish" ALTER COLUMN id SET DEFAULT nextval('public."Dish_id_seq"'::regclass);
 8   ALTER TABLE public."Dish" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    24773    Order id    DEFAULT     h   ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);
 9   ALTER TABLE public."Order" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    24828    OrderDish id    DEFAULT     p   ALTER TABLE ONLY public."OrderDish" ALTER COLUMN id SET DEFAULT nextval('public."OrderDish_id_seq"'::regclass);
 =   ALTER TABLE public."OrderDish" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    24814 	   Review id    DEFAULT     j   ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);
 :   ALTER TABLE public."Review" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    24730    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            R          0    24794    Cart 
   TABLE DATA           \   COPY public."Cart" ("customerId", "dishId", "createdAt", "updatedAt", quantity) FROM stdin;
    public          postgres    false    225   cU       M          0    24748    Customer 
   TABLE DATA           u   COPY public."Customer" (id, username, email, role, password, "createdAt", "updatedAt", "profilePicture") FROM stdin;
    public          postgres    false    220   �U       O          0    24759 
   Deliverers 
   TABLE DATA           _   COPY public."Deliverers" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   �X       K          0    24739    Dish 
   TABLE DATA           i   COPY public."Dish" (id, name, description, price, category, photo, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   Z       Q          0    24770    Order 
   TABLE DATA           t   COPY public."Order" (id, address, coment, "customerId", status, "deliveryId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   I`       V          0    24825 	   OrderDish 
   TABLE DATA           b   COPY public."OrderDish" (id, "orderId", "dishId", quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    229   b       T          0    24811    Review 
   TABLE DATA           V   COPY public."Review" (id, coment, "createdAt", "updatedAt", "customerId") FROM stdin;
    public          postgres    false    227   kc       G          0    16399    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    214   ce       I          0    24727    User 
   TABLE DATA           R   COPY public."User" (id, username, email, role, password, "updatedAt") FROM stdin;
    public          postgres    false    216   �f       d           0    0    Customer_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Customer_id_seq"', 18, true);
          public          postgres    false    219            e           0    0    Deliverers_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Deliverers_id_seq"', 5, true);
          public          postgres    false    221            f           0    0    Dish_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Dish_id_seq"', 43, true);
          public          postgres    false    217            g           0    0    OrderDish_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."OrderDish_id_seq"', 71, true);
          public          postgres    false    228            h           0    0    Order_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Order_id_seq"', 19, true);
          public          postgres    false    223            i           0    0    Review_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Review_id_seq"', 23, true);
          public          postgres    false    226            j           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 1, false);
          public          postgres    false    215            �           2606    24757    Customer Customer_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_email_key" UNIQUE (email);
 I   ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "Customer_email_key";
       public            postgres    false    220            �           2606    24755    Customer Customer_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "Customer_pkey";
       public            postgres    false    220            �           2606    24768    Deliverers Deliverers_email_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."Deliverers"
    ADD CONSTRAINT "Deliverers_email_key" UNIQUE (email);
 M   ALTER TABLE ONLY public."Deliverers" DROP CONSTRAINT "Deliverers_email_key";
       public            postgres    false    222            �           2606    24766    Deliverers Deliverers_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Deliverers"
    ADD CONSTRAINT "Deliverers_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Deliverers" DROP CONSTRAINT "Deliverers_pkey";
       public            postgres    false    222            �           2606    24746    Dish Dish_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Dish"
    ADD CONSTRAINT "Dish_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Dish" DROP CONSTRAINT "Dish_pkey";
       public            postgres    false    218            �           2606    24831    OrderDish OrderDish_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."OrderDish"
    ADD CONSTRAINT "OrderDish_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."OrderDish" DROP CONSTRAINT "OrderDish_pkey";
       public            postgres    false    229            �           2606    24777    Order Order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public            postgres    false    224            �           2606    24818    Review Review_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_pkey";
       public            postgres    false    227            �           2606    16403     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    214            �           2606    24737    User User_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);
 A   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_email_key";
       public            postgres    false    216            �           2606    24735    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    216            �           2606    24800    Cart Cart_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id);
 G   ALTER TABLE ONLY public."Cart" DROP CONSTRAINT "Cart_customerId_fkey";
       public          postgres    false    225    3237    220            �           2606    24805    Cart Cart_dishId_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES public."Dish"(id);
 C   ALTER TABLE ONLY public."Cart" DROP CONSTRAINT "Cart_dishId_fkey";
       public          postgres    false    3233    225    218            �           2606    24837    OrderDish OrderDish_dishId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderDish"
    ADD CONSTRAINT "OrderDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES public."Dish"(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."OrderDish" DROP CONSTRAINT "OrderDish_dishId_fkey";
       public          postgres    false    3233    218    229            �           2606    24832     OrderDish OrderDish_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderDish"
    ADD CONSTRAINT "OrderDish_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."OrderDish" DROP CONSTRAINT "OrderDish_orderId_fkey";
       public          postgres    false    224    3243    229            �           2606    24778    Order Order_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id);
 I   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_customerId_fkey";
       public          postgres    false    3237    220    224            �           2606    24783    Order Order_deliveryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES public."Deliverers"(id);
 I   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_deliveryId_fkey";
       public          postgres    false    224    3241    222            �           2606    32783    Review Review_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id);
 K   ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_customerId_fkey";
       public          postgres    false    220    3237    227            �           2606    40979    Cart fk_cart_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT fk_cart_customer FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public."Cart" DROP CONSTRAINT fk_cart_customer;
       public          postgres    false    225    220    3237            �           2606    40984    Cart fk_cart_dish    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT fk_cart_dish FOREIGN KEY ("dishId") REFERENCES public."Dish"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 =   ALTER TABLE ONLY public."Cart" DROP CONSTRAINT fk_cart_dish;
       public          postgres    false    225    3233    218            R   O   x����� �j~
�t@.�,�?GRRDJ�%�-)�Ž��>c0�:9�~�}�n?���#�pU���^x��V5��"%6      M   �  x���K��0F��+\�n�I�U���VPP��jZEA���Tz�n���lnQ�Q9'�ͅ�;��W���pN���%��6���
LB?�"��A�_!|��"�� ��_�K��. �sz.7�dC����N�� xfK7�ӂ���F��^�+��_ �2
�fî4q��X���=��:�*��چ�,�ّ*mL���صg(�@�.BY��� �e��w�r��.���s%>�$��kҜ�lږ>k�`o,�ű�z:[IW�|Z���&��51ٹu��E��+H<�3�K���3�r+���Pi���@��#�R�|Oة�����%QٖtHTlk���s���%
G ��J�Q����'�F/%C<�&f�p�]�S���ֺ{����w1;H�]�h�\��K��G 
EH�D�ۃ��&��V����Xݗ��%�Di4�U�1�N��[�M����h�+��`��ot���0���E'1�Y���\�q�w�x�hx*���S}�4˗�#^�M�Q͐�m�������'��@��C�s$~��Q��|4�r����xU��U�DƦ���9M��%�?�T�&��2	Ig�$��G	�IϚ(�<�F�a.��2����+��
��5��5n{I�w��y�jɦT*�0�H��p����>�l8q��s@�ᝒX��䲇B��(
�N��      O   e  x���Mo�@���+l�����AQ�P��M�ukQ���jc�����d&��yf
S9KX�/�y�u���U��I	+?M7q2�H�BXJM�4I)V	���;-�,���	�C��a!ci�S�|6_(4�@P��נ�o�����C��cfF/�����ٙ�Ա@`�Mע�ɬwCU�ːj2�0!-X]F�$�6�Vq,}1��x��s_J}�AXt[���cu#�:�4d�W���>ن�삈w��������a�,����A�A*ң�/�rp��g�Y�Q����Rq�{��da�2��G*�[8L�7	n��fO?��5I���P5���H*��x�'�T*��/      K   6  x��X�n�8|f��/�KŖ��1,�,zC��`(h��XK�@RN���9�dǉ[`�S�8g8�3̘��*Yˊ�w��bw�J��FU��O�	��\��([oy��SU6�V�f�����7��ۈͣ�Kf�0N�(E&��]Eu��xO�F���ǣ�0^L�h:_Nf���_?=���ڭt�n
a�J�Rʔ�~��
P�N_6-��t�VsQ�x��UĦ������쭑6�w�(u��U ���<�O�A����&,��$2b��W��{��`ˌ�iL��߄m��L:�,$��s� ��ӥpz�)�uce�ʵg_ZQJ�?b��y�������)V�,�-i�c7'���[��3�z��>9�wXʯ}����7��IB���ҁ����X�Eؖv��ª"�.�ʨ�Gl�Z������h?V -��{ÿ�)��I�f���S9��(�ZR9��&��S�zN���w��/ϗE�-1�ӟ�����BU�Z>K�z�1��DF����0KM*���'
%*hT�	���	vs�b�9.EBER!�8lQJK�x��
Z�+�)#:�푽sʜ�fˮ9���I#AK{^A������z�c�a��|�����^����_D�n�݅��	�*V QkC�RtL�[=ob�Nl\@O�@B���0|�;,����z����C��{S.�Ac�����U��i����g��@ҫ����6�k��JX�S~��vu�H&�$�/���e~�)�'WN�/����]�ݥm�-@��Fz���]��&�5�u�Z(�<�����<��}?����������)!X��.W;��`O�\�Jkg �@�z����7k�b��%䓗��J�!�NW���o�	�~t�+��k�ǭJ��7�>"e�/��}H��'�I)�KY�����j���TH3����T�2b�c0������^�O������m�K��,ڇ�����E���o$�$������A�V�8�����b8׆8\�2h}��j��C+JmD��A��0���m�\��3�b��pG�u�Sl�cJ�7E^���
����cV>��QA;u���:�:��{�X',�t̮�
bS荀AP�pj#��v�:��.�O�`�Kꩡ�z>�8���7���Td�N��k������i80��j��$�0M$��	��.e�fd��Q?�~�P����F�vA�/���j�n���ۊ%��(��\�@.�G~����Z=���#E�����ELٽ2�؆u6�i*�Y8v�B�׉�4�0"�#��0idZ�*B�E�ئ��^sqt����`�u�E��7b��s����Z��G1��Չ�*��zF���
]�)�]��i��o�����u���B��aN�Z�.���ާ�ܹ�.�Ϸ� D���
 -|3��������p�+d��0��̾5����|5�~�ŏ�0ޘ(�%>�_�?��T�C��Az��ɜ��~���\�����l4��"�-p��̟�{t�����XO�ǥj��B4�(�F1�7� �Z�L���j������03�C>�.���x]�/�n��#zr�otrr�(���      Q   �  x���Mo�0��ίΰ���������z���6�]����8TK��"q�F~�y�AǬ��!��'v�g�\ڮ|�/)�ޠܠ4Q��%�ҽ�L�S�A�k�S������jl4�ę���1�m�<��PG!�7�x��Ii��3m,\�������3�	�m��p8I���c�-�p 1*�Pq%���Q�L�A��D���<���Ӑ���+� �4fN�MO���7�"HEM�c��ifFs��p��XD@�8��\99c+�<C��\m�]X�Q���h�y�w��1��&�u��^U�c(A�R��sb�澻���~��������	.`4��(�l�\xD˘��<7�t̾kBԎ�Khs>�����w��a���6x8�A�r���bAFa��\�g� �Z��MeW�^�����TS&�K]�67�i�_ �2      V   K  x��TK�1['���S# @>gy�?ǃ�J��Ψ�6vbc��ZBL5?�6��<�0s���f&S��c"5�D�$�¦R�~$��5��"QC����tW���qt%�H�U(Z:�/�N��uTm��þ"�%�H��#���QK��QC.>Q2<]Ƣ{u�-)>;������:Q�v�������5��и���]N+�`�L��|��HV�b�qC��L�B���e����n�|����y�O����j��%<�ݠ/i�B?#Y�\���4�OP�zA�������!���o��[��yM��k[�oPnV���q�j�`��V(�����]{o      T   �  x��Q͎�0<;O��L�v~���. qً��[7�]�n��X8p ��Ҳ����}�pB˶����9�ьg>��W��(��9���y5Y��y��!�p�� H��4�R�8�1y���Ao���+���Úi(Պ�}/��0[j�`�I�ԣ�E뒷�Ϧ"+���LΔ�Dފ���O��]25�0fYq�q��͹v��(#���\�	��i#�S+���?�i+ӥZw�����r�~*�Dċ����9�n�+�e�� ��
yz�3���L�^y	���v/����?�[�wn��=���������>� p��RL|��C�c����|��\v�4i�!����p'2B�����}��8ui�G����W�����GZ�0L#�Gtx(q����\/����d\W�?�}�����>ح;n�������ˆ�;��� IÑ���؁�#!��k�#�@0JI�.�����~�g��y�X�;5      G   #  x����R� �{߅�@?�^|/�fw��!���Ku۵�3ɟP�� YB�v��,DE�<��E
�!A����k�Xmm��%��C�U�l~�O� �l҇.ߎJ��Xb�"�L�緌��b}�[G�a(��Zͯ�a��w<���K�N�D��S���V��\��y����V G����I���wC'�����O��oەn��i�W7]��]�)���X6��)�S�>�J���9��EItq�u쯇���JE�@�w�K����-���Z?��$�����ө(�Oޮ�      I      x������ � �     