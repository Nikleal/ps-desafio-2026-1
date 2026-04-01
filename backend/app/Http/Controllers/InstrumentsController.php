<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInstrumentsRequest;
use App\Http\Requests\UpdateInstrumentsRequest;
use App\Models\Instruments;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class InstrumentsController extends Controller
{
    protected $instrument;

    public function __construct(Instruments $instrument){
        $this->instrument = $instrument;
    }


    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        $instruments = $this->instrument->with('category')->get();
        return response()->json($instruments, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInstrumentsRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        if($request->hasFile('image')){
            $path = $request->file('image')->store('instruments', 'public');
            $data['image'] = url('storage/'.$path);
        }
        $instrument = $this->instrument->create($data);
        $id = $instrument->id;
        $instrument_category = $this->instrument->with('category')->findOrFail($id);

        return response()->json($instrument_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $instrument = $this->instrument->with('category')->findOrFail($id);
        return response()->json($instrument, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInstrumentsRequest $request, $id): JsonResponse
    {
        $instrument = $this->instrument->with('category')->findOrFail($id);
        $data = $request->validated();
        
        if($request->hasfile('image')){
            try{
                $image_name = explode('instruments/', $instrument['image']);
                Storage::disk('public')->delete('instruments/'.$image_name[1]);
            } catch(Throwable){
            }finally{
                $path = $request->file('image')->store('instruments', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $instrument->update($data);
        return response()->json($instrument, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $instrument = $this->instrument->findOrFail($id);
        $instrument->delete();
        return response()->json(['Message' => 'Produto deletado com sucesso']); 
    }
}
